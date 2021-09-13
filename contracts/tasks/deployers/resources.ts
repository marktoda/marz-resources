import { task, types } from 'hardhat/config'
import { TaskArguments } from 'hardhat/types'

task('deploy:Resources').setAction(async function (_args: TaskArguments, hre) {
  const marz = '0xd0ba8b19b0f5e25c11ed233302e75794c9d3142b'
  console.log(`Deploying Marz Resources with: marz ${marz}`)

  const factory = await hre.ethers.getContractFactory('MarzResources')
  const resources = await hre.upgrades.deployProxy(factory, [marz], {
    initializer: 'initialize(address)',
  })

  try {
    await hre.run('verify:Resources', { address: resources.address })
  } catch (e) {
    console.log('Unable to verify on etherscan', e)
  }
})

task('verify:Resources', 'Verifies on etherscan')
  .addParam('address', 'the contract address', undefined, types.string, false)
  .setAction(async function (args: TaskArguments, hre) {
    const { address } = args

    await hre.run('verify:verify', {
      address,
      constructorArguments: [],
    })
  })
