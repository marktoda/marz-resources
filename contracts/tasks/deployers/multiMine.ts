import { task, types } from 'hardhat/config'
import { TaskArguments } from 'hardhat/types'

task('deploy:MultiMine').setAction(async function (_args: TaskArguments, hre) {
  const resources = '0x75376c8b1afc6a6d7cd18617cf2ada431d50b3fa'
  console.log(`Deploying Resources MultiMine with: resources ${resources}`)

  const factory = await hre.ethers.getContractFactory('MultiMine')
  const multiMine = await factory.deploy(resources);
  await multiMine.deployed();

  try {
    await hre.run('verify:MultiMine', { address: multiMine.address, resources })
  } catch (e) {
    console.log('Unable to verify on etherscan', e)
  }
})

task('verify:MultiMine', 'Verifies on etherscan')
  .addParam('address', 'the contract address', undefined, types.string, false)
  .addParam('resources', 'the resources address', undefined, types.string, false)
  .setAction(async function (args: TaskArguments, hre) {
    const { address, resources } = args

    await hre.run('verify:verify', {
      address,
      constructorArguments: [resources],
    })
  })
