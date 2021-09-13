import { ethers } from 'hardhat'

async function main(): Promise<void> {
  const MarzLand = await ethers.getContractFactory('MarzLand')
  const marz = await MarzLand.deploy()
  await marz.deployed()
  console.log('Marz deployed to: ', marz.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
