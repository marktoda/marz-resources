import { ethers, upgrades } from 'hardhat'
import { Signer } from 'ethers'
import { expect } from 'chai'
import { MockMarz, MarzResources } from '../typechain'
import { BlockchainTime } from './utils/time'

const DAY_IN_SECONDS = 86400

interface TestContext {
  accounts: Signer[]
  deployer: Signer
  user: Signer
  marz: MockMarz
  resources: MarzResources
}

async function setupContracts(): Promise<TestContext> {
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]

  const user = accounts[1]

  const mockNFTFactory = await ethers.getContractFactory('MockMarz')
  const marz = <MockMarz>await upgrades.deployProxy(mockNFTFactory, [], {
    initializer: 'initialize()',
  })

  const factory = await ethers.getContractFactory('MarzResources')
  const resources = <MarzResources>await upgrades.deployProxy(
    factory,
    [marz.address],
    {
      initializer: 'initialize(address)',
    },
  )

  return {
    accounts,
    deployer,
    user,
    marz,
    resources,
  }
}

describe('MarzResources:construction', () => {
  it('should have correct marz address', async function () {
    const { marz, resources } = await setupContracts()
    expect(await resources.marz()).to.eq(marz.address)
  })

  it('should have 0 for initial start times', async function () {
    const { marz, user, resources } = await setupContracts()
    await marz.connect(user).mint()
    const tokenId = 0
    expect(await resources.startTimes(tokenId)).to.eq(0)
  })

  it('should have 0 for initial claimed', async function () {
    const { marz, user, resources } = await setupContracts()
    await marz.connect(user).mint()
    const tokenId = 0
    expect(await resources.claimed(tokenId)).to.eq(0)
  })

  it('should get the proper uri', async function () {
    const { resources } = await setupContracts()
    expect(await resources.uri(5)).to.eq('https://api.marzmining.xyz/token/5')
  })
})

describe('MarzResources:getResources', () => {
  it('should return different resources for different plots', async function () {
    const { marz, user, resources } = await setupContracts()

    const counts: Set<number> = new Set()
    const types: Set<number> = new Set()
    const typeCounts: { [key: number]: number } = {}
    for (let i = 0; i < 500; i++) {
      await marz.connect(user).mint()
      const plotResources = await resources.getResources(i)
      counts.add(plotResources.length)
      for (const plotResource of plotResources) {
        types.add(plotResource.toNumber())

        typeCounts[plotResource.toNumber()] =
          typeCounts[plotResource.toNumber()] === undefined
            ? 1
            : typeCounts[plotResource.toNumber()] + 1
      }
    }
    expect(Array.from(counts).sort()).to.eql([1, 2, 3, 4])
    expect(Array.from(types).sort((a, b) => a - b)).to.eql([
      ...Array(19).keys(),
    ])
  })
})

describe('MarzResources:mine', () => {
  const blockchainTime = new BlockchainTime()

  it('should return mine initial set right away', async function () {
    const { marz, user, resources } = await setupContracts()

    for (let i = 0; i < 20; i++) {
      await marz.connect(user).mint()
      const expectedResources = await resources.getResources(i)
      const expectedAmounts: number[] = new Array(
        expectedResources.length,
      ).fill(1)

      await expect(resources.connect(user).mine(i))
        .to.emit(resources, 'TransferBatch')
        .withArgs(
          await user.getAddress(),
          ethers.constants.AddressZero,
          await user.getAddress(),
          expectedResources,
          expectedAmounts,
        )
    }
  })

  it('should mint to the token owner', async function () {
    const { marz, user, deployer, resources } = await setupContracts()

    for (let i = 0; i < 20; i++) {
      await marz.connect(user).mint()
      const expectedResources = await resources.getResources(i)
      const expectedAmounts: number[] = new Array(
        expectedResources.length,
      ).fill(1)

      await expect(resources.connect(deployer).mine(i))
        .to.emit(resources, 'TransferBatch')
        .withArgs(
          await deployer.getAddress(),
          ethers.constants.AddressZero,
          await user.getAddress(),
          expectedResources,
          expectedAmounts,
        )
    }
  })

  it('should fail with unminted plot', async function () {
    const { user, resources } = await setupContracts()

    await expect(resources.connect(user).mine(15)).to.be.revertedWith(
      'ERC721: owner query for nonexistent token',
    )
  })

  it('should fail when called again before time passed', async function () {
    const { user, marz, resources } = await setupContracts()
    await marz.connect(user).mint()

    await expect(resources.connect(user).mine(0)).to.not.be.reverted

    await expect(resources.connect(user).mine(0)).to.be.revertedWith(
      'No resources to claim',
    )
  })

  it('should mint one more after one day', async function () {
    const { user, marz, resources } = await setupContracts()
    await marz.connect(user).mint()
    const tokenId = 0

    const expectedResources = await resources.getResources(tokenId)
    const expectedAmounts: number[] = new Array(expectedResources.length).fill(
      1,
    )
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        expectedAmounts,
      )

    await blockchainTime.increaseTime(DAY_IN_SECONDS)

    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        expectedAmounts,
      )
  })

  it('should mint two more after two days', async function () {
    const { user, marz, resources } = await setupContracts()
    await marz.connect(user).mint()
    const tokenId = 0

    const expectedResources = await resources.getResources(tokenId)
    const expectedAmounts: number[] = new Array(expectedResources.length).fill(
      1,
    )
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        expectedAmounts,
      )

    await blockchainTime.increaseTime(DAY_IN_SECONDS * 2)

    const newExpectedAmounts: number[] = new Array(
      expectedResources.length,
    ).fill(2)
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        newExpectedAmounts,
      )
  })

  it('should mint 29 after a long time', async function () {
    const { user, marz, resources } = await setupContracts()
    await marz.connect(user).mint()
    const tokenId = 0

    const expectedResources = await resources.getResources(tokenId)
    const expectedAmounts: number[] = new Array(expectedResources.length).fill(
      1,
    )
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        expectedAmounts,
      )

    await blockchainTime.increaseTime(DAY_IN_SECONDS * 100)

    const newExpectedAmounts: number[] = new Array(
      expectedResources.length,
    ).fill(29)
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        newExpectedAmounts,
      )
  })

  it('should throw after claiming all', async function () {
    const { user, marz, resources } = await setupContracts()
    await marz.connect(user).mint()
    const tokenId = 0

    const expectedResources = await resources.getResources(tokenId)
    const expectedAmounts: number[] = new Array(expectedResources.length).fill(
      1,
    )
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        expectedAmounts,
      )

    await blockchainTime.increaseTime(DAY_IN_SECONDS * 100)

    const newExpectedAmounts: number[] = new Array(
      expectedResources.length,
    ).fill(29)
    await expect(resources.connect(user).mine(tokenId))
      .to.emit(resources, 'TransferBatch')
      .withArgs(
        await user.getAddress(),
        ethers.constants.AddressZero,
        await user.getAddress(),
        expectedResources,
        newExpectedAmounts,
      )

    await expect(resources.connect(user).mine(tokenId)).to.be.revertedWith(
      'Already claimed all resources',
    )
  })
})
