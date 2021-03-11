import { BigNumber } from "@ethersproject/bignumber";

export type MinerStatus = {
  ethBalance: BigNumber;
  fbgBalance: BigNumber;
  tokenBalance: BigNumber;
  fbcBalace: BigNumber;
  earningBalance: BigNumber;
  fbgStaked: BigNumber;
  tokenStaked: BigNumber;
};