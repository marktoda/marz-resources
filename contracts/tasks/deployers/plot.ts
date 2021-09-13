import { task, types } from 'hardhat/config'
import { TaskArguments } from 'hardhat/types'

// TODO: @mark use oz upgrades package to deploy (refer test)
// This helps set the proxy admin for upgrades
task('deploy:Plot')
  .addParam('lootnft', 'the loot NFT address', undefined, types.string, false)
  .addParam(
    'towns',
    'The initial nfts that will be minted as towns',
    undefined,
    types.json,
    true,
  )
  .setAction(async function (args: TaskArguments, hre) {
    const { lootnft, towns } = args
    console.log(
      `Deploying Plot with: \nlootNft ${lootnft} and \ntowns ${towns}`,
    )
    // in case initialization goes in with too low gas price or something we can fetch already deployed
    // with this
    // const marz = await hre.ethers.getContractAt("Plot", "0x4c1c852cfef658606ceedf5e289aa0bd2b467385");

    const factory = await hre.ethers.getContractFactory('Plot')
    const plot = await hre.upgrades.deployProxy(factory, [lootnft, towns], {
      initializer: 'initialize(address, uint256[])',
    })

    try {
      await hre.run('verify:Plot', { address: plot.address })
    } catch (e) {
      console.log('Unable to verify on etherscan', e)
    }
  })

task('verify:Plot', 'Verifies on etherscan')
  .addParam('address', 'the contract address', undefined, types.string, false)
  .setAction(async function (args: TaskArguments, hre) {
    const { address } = args

    await hre.run('verify:verify', {
      address,
      constructorArguments: [],
    })
  })
