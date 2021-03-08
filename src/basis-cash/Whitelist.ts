import { BigNumber, Contract, ethers, Wallet } from 'ethers';
import { getBalance } from '../utils/formatBalance';
import { Deployments } from './deployments';
import ERC20 from './ERC20';

export type RobotConfiguration = {
  privateKey: string;
  account: string;
  name: string;
  bankName: string,
  depositTokenName: string,
  depositTokenAddress: string,
  eranTokenName: string,
  eranTokenNameAddress: string,
  intervalMinitues: number
};

export class WhiteListRobot {
  wallet: Wallet;
  config: RobotConfiguration;
  provider: any;
  deployments: Deployments;
  name: string;
  pool: Contract;
  fbgSwapper: Contract;
  depositToken: ERC20;
  earnToken: ERC20;
  fbg: ERC20;

  stakeCount: number;
  stakeAmount: BigNumber;

  fbgBalance: BigNumber;
  earnBalance: BigNumber;
  depositBalance: BigNumber;

  rewardCount: number;
  rewardAmount: BigNumber;

  swapCount: number;
  swapAmount: BigNumber;

  depostionCount: number;
  depostionAmount: BigNumber;

  constructor(cfg: RobotConfiguration, deployments: Deployments) {

    this.config = cfg;
    this.deployments = deployments;
    this.name = this.config.name;

    this.stakeAmount = BigNumber.from(0);
    this.stakeCount = 0;

    this.rewardAmount = BigNumber.from(0);
    this.rewardCount = 0;

    this.swapAmount = BigNumber.from(0);
    this.swapCount = 0;

    this.depostionAmount = BigNumber.from(0);
    this.depostionCount = 0;

  }

  gasOptions(gas: BigNumber) {
    const multiplied = Math.floor(gas.toNumber() * 1.1);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied)
    };
  }


  start = (provider_: any) => {
    this.provider = provider_;
    this.wallet = new Wallet(this.config.privateKey, this.provider);


    this.pool = new Contract(
      this.deployments[this.config.bankName].address,
      this.deployments[this.config.bankName].abi,
      this.wallet);

    this.fbgSwapper = new Contract(
      this.deployments["FBGSwapper"].address,
      this.deployments["FBGSwapper"].abi,
      this.wallet);

    this.depositToken = new ERC20(this.config.depositTokenAddress, this.wallet, this.config.depositTokenName, 18);
    this.earnToken = new ERC20(this.config.eranTokenNameAddress, this.wallet, this.config.eranTokenName, 18);
    this.fbg = new ERC20(this.deployments.FBG.address, this.wallet, 'FBG', 18);

    const refreshBalance = setInterval(this.loop, this.config.intervalMinitues*1000*60);
  }
  

  loop = async () => {
    console.log("loop called");
    // this.stakeLastest();

    const depAllowance: BigNumber = await this.depositToken.allowance(this.config.account, this.pool.address);
    if (depAllowance.isZero() || depAllowance.isNegative()) {
      await this.depositToken.approve(this.pool.address, ethers.constants.MaxUint256);
      console.log("depositToken  allowance not ok!");
      return;
    }

    const earnAllowance: BigNumber = await this.earnToken.allowance(this.config.account, this.fbgSwapper.address);
    if (earnAllowance.isZero() || earnAllowance.isNegative()) {
      await this.earnToken.approve(this.fbgSwapper.address, ethers.constants.MaxUint256);
      console.log("earnToken  allowance not ok!");
      return;
    }

    const fbgAllowance: BigNumber = await this.fbg.allowance(this.config.account, this.pool.address);
    if (fbgAllowance.isZero() || fbgAllowance.isNegative()) {
      await this.fbg.approve(this.pool.address, ethers.constants.MaxUint256);
      console.log("fbg  allowance not ok!");
      return;
    }

    //query earnings, if >0.01, getReward 
    const earn: BigNumber = await this.pool.earned(this.config.account);
    const earnNumber: number = getBalance(earn, 16) / 100;
    console.log("earn balance = " + earnNumber);
    if (earnNumber > 0.01) {
      const gas = await this.pool.estimateGas.getReward();
      let result = await this.pool.getReward(this.gasOptions(gas));
      console.log("result:" + JSON.stringify(result));
      if (result && result.hash) {
        this.rewardCount++;
        this.rewardAmount = this.rewardAmount.add(earn);
        console.log(`[${this.name}]:do new reward:${earnNumber}`);

        return;
      }

    }

    //query fbc balance, if >0.01 FBC, buy fbg
    this.earnBalance = await this.earnToken.balanceOf(this.config.account);
    const fbcBalanceNumber: number = getBalance(this.earnBalance, 16) / 100;
    console.log("fbc balance = " + fbcBalanceNumber);
    if (fbcBalanceNumber > 0.01) {
      const gas = await this.fbgSwapper.estimateGas.swap(this.earnBalance);
      let result = await this.fbgSwapper.swap(this.earnBalance, this.gasOptions(gas));
      console.log("result:" + JSON.stringify(result));
      if (result && result.hash) {
        this.swapCount++;
        this.swapAmount = this.swapAmount.add(this.earnBalance);
        console.log(`[${this.name}]:do new buyfbg:${fbcBalanceNumber}`);

        return;
      }
    }

    //query fbg balance, if >0.01 fbg, stakeFBG
    this.fbgBalance = await this.fbg.balanceOf(this.config.account);
    const fbgBalanceNumber: number = getBalance(this.fbgBalance, 16) / 100;
    console.log("fbg balance = " + fbgBalanceNumber);
    if (fbgBalanceNumber > 0.01) {
      const gas = await this.pool.estimateGas.stakeFBG(this.fbgBalance);
      let result = await this.pool.stakeFBG(this.fbgBalance, this.gasOptions(gas));
      console.log("result:" + JSON.stringify(result));
      if (result && result.hash) {
        this.stakeCount++;
        this.stakeAmount = this.stakeAmount.add(this.fbgBalance);
        console.log(`[${this.name}]:do new stakeFBG:${fbgBalanceNumber}`);
      }
    }
  }
}
