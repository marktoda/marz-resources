import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@openzeppelin/hardhat-upgrades'

import './tasks/accounts'
import './tasks/clean'
import './tasks/deployers'
import './tasks/upgrade'

import { resolve } from 'path'

import { config as dotenvConfig } from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import { NetworkUserConfig } from 'hardhat/types'

dotenvConfig({ path: resolve(__dirname, './.env') })

const chainIds = {
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
}

// Ensure that we have all the environment variables we need.
let privateKey: string
if (!process.env.PRIVATE_KEY) {
  privateKey =
    '0x0000000000000000000000000000000000000000000000000000000000000000'
} else {
  privateKey = process.env.PRIVATE_KEY
}

let infuraApiKey: string
if (!process.env.INFURA_API_KEY) {
  infuraApiKey = 'test'
} else {
  infuraApiKey = process.env.INFURA_API_KEY
}

let etherscanApiKey: string
if (!process.env.ETHERSCAN_API_KEY) {
  etherscanApiKey = 'test'
} else {
  etherscanApiKey = process.env.ETHERSCAN_API_KEY
}

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = 'https://' + network + '.infura.io/v3/' + infuraApiKey
  return {
    accounts: [privateKey],
    chainId: chainIds[network],
    url,
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanApiKey,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      },
      chainId: chainIds.hardhat,
    },
    goerli: getChainConfig('goerli'),
    kovan: getChainConfig('kovan'),
    rinkeby: getChainConfig('rinkeby'),
    ropsten: getChainConfig('ropsten'),
    mainnet: getChainConfig('mainnet'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    version: '0.8.6',
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: 'none',
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 100000,
  },
}

export default config
