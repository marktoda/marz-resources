import { task, types } from 'hardhat/config'
import { TaskArguments } from 'hardhat/types'

task('upgrade:Resources')
    .addParam('address', 'the old contract address', undefined, types.string, false)
    .setAction(async function (args: TaskArguments, hre) {
  const { address } = args;
  const marz = '0xd0ba8b19b0f5e25c11ed233302e75794c9d3142b'
  console.log(`Deploying Marz Resources with: marz ${marz}`)

  const factory = await hre.ethers.getContractFactory('MarzResources')
  const resources = await hre.upgrades.upgradeProxy(address, factory);
  console.log(`upgraded ${resources.address}`);
})
