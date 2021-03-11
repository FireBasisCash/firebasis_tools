import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 128,

    etherscanUrl: 'https://hecoinfo.com/',
    defaultProvider: 'https://http-mainnet-node.huobichain.com',
    deployments: require('./basis-cash/deployments/deployments.heco.json'),
    externalTokens: {

      'USDT': ['0xa71edc38d189767582c38a3145b5873052c3e47a', 18],
      'HBTC': ['0x66a79d23e58475d2738179ca52cd0b41d73f0bea', 18],
      'HETH': ['0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', 18],
      'MDX': ['0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c', 18],
      'HDOT': ['0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3', 18],
      'HLTC': ['0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4', 18],
      'HFIL': ['0xae3a768f9ab104c69a7cd6041fe16ffa235d1810', 18],

      'FBS_USDT_LP': ['0xb068c8dd3d956df8DF537CEbCF97f0d2A8013cBF', 18],
      'FBC_USDT_LP': ['0x9FF0d13768f5788056E74f052857d12f4f7ac15A', 18],
      'FBG_USDT_LP': ['0xcDb955FAd4CEb5c5df5A3baa34E90Fce9a1f455a', 18],

      //HT
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 6000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: 128,
    etherscanUrl: 'https://hecoinfo.com/',
    defaultProvider: 'https://http-mainnet-node.huobichain.com',
    deployments: require('./basis-cash/deployments/deployments.heco.json'),
    externalTokens: {

      'USDT': ['0xa71edc38d189767582c38a3145b5873052c3e47a', 18],
      'HBTC': ['0x66a79d23e58475d2738179ca52cd0b41d73f0bea', 18],
      'HETH': ['0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', 18],
      'MDX': ['0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c', 18],
      'HDOT': ['0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3', 18],
      'HLTC': ['0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4', 18],
      'HFIL': ['0xae3a768f9ab104c69a7cd6041fe16ffa235d1810', 18],

      'FBS_USDT_LP': ['0xb068c8dd3d956df8DF537CEbCF97f0d2A8013cBF', 18],
      'FBC_USDT_LP': ['0x9FF0d13768f5788056E74f052857d12f4f7ac15A', 18],
      'FBG_USDT_LP': ['0xcDb955FAd4CEb5c5df5A3baa34E90Fce9a1f455a', 18],

      //HT
    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 6000,
    gasLimitMultiplier: 1.1,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  // FBC
  FBG_Pool: {
    name: 'FBG Pool',
    contract: 'FBG_CashPool',
    depositTokenName: 'FBG',
    earnTokenName: 'FBC',
    finished: false,
    sort: 1,
    accelerator: false,
    acceleratorTokenName: 'FBG',
    started: false
  },
  USDTAcceleratorCashPool: {
    name: 'USDT Pool',
    contract: 'USDT_AcceleratorCashPool',
    depositTokenName: 'USDT',
    earnTokenName: 'FBC',
    finished: false,
    sort: 2,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },

  ETH_AcceleratorCashPool: {
    name: 'HT Pool',
    contract: 'ETH_AcceleratorCashPool',
    depositTokenName: 'HT',
    earnTokenName: 'FBC',
    finished: false,
    sort: 3,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
  HBTC_AcceleratorCashPool: {
    name: 'HBTC Pool',
    contract: 'HBTC_AcceleratorCashPool',
    depositTokenName: 'HBTC',
    earnTokenName: 'FBC',
    finished: false,
    sort: 4,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
  HETH_AcceleratorCashPool: {
    name: 'HETH Pool',
    contract: 'HETH_AcceleratorCashPool',
    depositTokenName: 'HETH',
    earnTokenName: 'FBC',
    finished: false,
    sort: 5,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
  HDOT_AcceleratorcCashPool: {
    name: 'HDOT Pool',
    contract: 'HDOT_AcceleratorCashPool',
    depositTokenName: 'HDOT',
    earnTokenName: 'FBC',
    finished: false,
    sort: 6,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
  HFIL_AcceleratorcCashPool: {
    name: 'HFIL Pool',
    contract: 'HFIL_AcceleratorCashPool',
    depositTokenName: 'HFIL',
    earnTokenName: 'FBC',
    finished: false,
    sort: 7,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },

  MDX_AcceleratorcCashPool: {
    name: 'MDX Pool',
    contract: 'MDX_AcceleratorCashPool',
    depositTokenName: 'MDX',
    earnTokenName: 'FBC',
    finished: false,
    sort: 8,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
  HLTC_AcceleratorcCashPool: {
    name: 'HLTC Pool',
    contract: 'HLTC_AcceleratorCashPool',
    depositTokenName: 'HLTC',
    earnTokenName: 'FBC',
    finished: false,
    sort: 9,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },



  // FBS
  FBCUSDTLPTokenAcceleratorSharePool: {
    name: 'FBC_USDT_LP Pool',
    contract: 'FBC_USDT_AcceleratorSharePool',
    depositTokenName: 'FBC_USDT_LP',
    earnTokenName: 'FBS',
    finished: false,
    sort: 11,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
  FBSUSDTLPTokenSharePool: {
    name: 'FBS_USDT_LP Pool',
    contract: 'FBS_USDT_AcceleratorSharePool',
    depositTokenName: 'FBS_USDT_LP',
    earnTokenName: 'FBS',
    finished: false,
    sort: 12,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false,
  },
  FBGUSDTLPTokenSharePool: {
    name: 'FBG_USDT_LP Pool',
    contract: 'FBG_USDT_AcceleratorSharePool',
    depositTokenName: 'FBG_USDT_LP',
    earnTokenName: 'FBS',
    finished: false,
    sort: 13,
    accelerator: true,
    acceleratorTokenName: 'FBG',
    started: false
  },
};

export default configurations[process.env.NODE_ENV || "development"];
