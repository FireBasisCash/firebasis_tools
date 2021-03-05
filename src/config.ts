import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.GÖRLI,
    etherscanUrl: 'https://goerli.etherscan.io',
    defaultProvider: 'https://goerli.infura.io/v3/f7af27e963cb41cbb46973bcc2d7944c',
    deployments: require('./basis-cash/deployments/deployments.goerli.json'),
    externalTokens: {
      'USDT': ['0x45Df2Ccc7a506D819C7c2d59Cfa44c73eda5C311', 18],
      'FBS_USDT_LP': ['0x2F5684996808A17CC5C1C95495504D599f62262d', 18],
      'FBC_USDT_LP': ['0xaB707042f31AfeD5FDF440D9f2C2Bba45F855844', 18],
      'FBG_USDT_LP': ['0xb5F8AaD755866ad31bCEB751a5256F328B5936C9', 18],

      //HT
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.GÖRLI,
    etherscanUrl: 'https://goerli.etherscan.io',
    defaultProvider: 'https://goerli.infura.io/v3/f7af27e963cb41cbb46973bcc2d7944c',
    deployments: require('./basis-cash/deployments/deployments.goerli.json'),
    // chainId: ChainId.MAINNET,
    // etherscanUrl: 'https://etherscan.io',
    // defaultProvider: 'https://mainnet.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    // deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      'USDT': ['0x45Df2Ccc7a506D819C7c2d59Cfa44c73eda5C311', 18],
      'FBS_USDT_LP': ['0x2F5684996808A17CC5C1C95495504D599f62262d', 18],
      'FBC_USDT_LP': ['0xaB707042f31AfeD5FDF440D9f2C2Bba45F855844', 18],
      'FBG_USDT_LP': ['0xb5F8AaD755866ad31bCEB751a5256F328B5936C9', 18],
      
      //HT

    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  // FBC
  FBG_Pool: {
    name: 'FBG Pool',
    contract: 'FBG_Pool',
    depositTokenName: 'FBG',
    earnTokenName: 'FBC',
    finished: false,
    sort: 1,
    accelerator:false,
    acceleratorTokenName: 'FBG'
  },
  USDTAcceleratorCashPool: {
    name: 'USDT Pool',
    contract: 'USDT_AcceleratorCashPool',
    depositTokenName: 'USDT',
    earnTokenName: 'FBC',
    finished: false,
    sort: 2,
    accelerator:true,
    acceleratorTokenName: 'FBG'
  },

  ETH_AcceleratorCashPool: {
    name: 'HT Pool',
    contract: 'ETH_AcceleratorCashPool',
    depositTokenName: 'HT',
    earnTokenName: 'FBC',
    finished: false,
    sort: 3,
    accelerator:true,
    acceleratorTokenName: 'FBG'
  },

  // FBS
  FBCUSDTLPTokenAcceleratorSharePool: {
    name: 'FBC_USDT_LP Pool',
    contract: 'FBC_USDT_AcceleratorSharePool',
    depositTokenName: 'FBC_USDT_LP',
    earnTokenName: 'FBS',
    finished: false,
    sort: 5,
    accelerator:true,
    acceleratorTokenName: 'FBG'
  },
  FBSUSDTLPTokenSharePool: {
    name: 'FBS_USDT_LP Pool',
    contract: 'FBS_USDT_AcceleratorSharePool',
    depositTokenName: 'FBS_USDT_LP',
    earnTokenName: 'FBS',
    finished: false,
    sort: 6,
    accelerator:true,
    acceleratorTokenName: 'FBG'
  },
  FBGUSDTLPTokenSharePool: {
    name: 'FBG_USDT_LP Pool',
    contract: 'FBG_USDT_AcceleratorSharePool',
    depositTokenName: 'FBG_USDT_LP',
    earnTokenName: 'FBS',
    finished: false,
    sort: 7,
    accelerator:true,
    acceleratorTokenName: 'FBG'
  },
};

export default configurations[process.env.NODE_ENV || "development"];


export const robotsConfig = [
  {
    name: "Robot-USDT-FBC-1",
    privateKey: "0x84ae2d8d3c1ee2cb4b7bd910dd82590d9769ce66450e389cc258370aaaa438a1",
    account: "0x14d234b468A32Ca411097e259956f5FEF2E8cd6a",
    bankName: "USDT_AcceleratorCashPool",
    depositTokenName: "USDT",
    depositTokenAddress: "0x45Df2Ccc7a506D819C7c2d59Cfa44c73eda5C311",
    eranTokenName: "FBC",
    eranTokenNameAddress: "0xec4D0506Dcdae8157F99925119b7EaE0BDe7CB68",
    intervalMinitues: 2
  },
  {
    name: "Robot-USDT-FBC-2",
    privateKey: "0xc82f91d0c858aaeb36dba13731e09867fd05424ffc3343f64a4ede29d0a73ea0",
    account: "0x3E4Fd8334AFe97fc4700111AF8237101BF7B8484",
    bankName: "USDT_AcceleratorCashPool",
    depositTokenName: "USDT",
    depositTokenAddress: "0x45Df2Ccc7a506D819C7c2d59Cfa44c73eda5C311",
    eranTokenName: "FBC",
    eranTokenNameAddress: "0xec4D0506Dcdae8157F99925119b7EaE0BDe7CB68",
    intervalMinitues: 2
  }
];



