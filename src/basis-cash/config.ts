import { Deployments } from './deployments';
import { ChainId } from '@uniswap/sdk';

export type WhitelistRobot =
  {
    address: string;
    privateKey: string;
    index: number;
  }

export type WhitelistConfig = {
  robots: WhitelistRobot[];
  contract: {
    address: string;
    abi: any[];
  }
  interval: number;
}

export type Configuration = {
  chainId: ChainId,
  etherscanUrl: string,
  defaultProvider: string,
  deployments: Deployments,
  externalTokens: { [contractName: string]: [string, number] };
  config?: EthereumConfig,

  baseLaunchDate: Date,
  bondLaunchesAt: Date,
  boardroomLaunchesAt: Date,

  refreshInterval: number;
  gasLimitMultiplier: number;
  whitelistConfig: WhitelistConfig;
};

export type EthereumConfig = {
  testing: boolean,
  autoGasMultiplier: number,
  defaultConfirmations: number,
  defaultGas: string,
  defaultGasPrice: string,
  ethereumNodeTimeout: number,
};

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: "6000000",
  defaultGasPrice: "1000000000000",
  ethereumNodeTimeout: 10000,
};
