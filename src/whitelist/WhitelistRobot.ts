import { BigNumber, Contract, ethers, Wallet } from 'ethers';
import { WhitelistConfig, WhitelistRobot } from '../basis-cash/config';

export type RobotConfiguration = {
  privateKey: string;
  account: string;
  name: string;
};

export class WhitelistHelper {
  provider: any;
  whitelistContract: Contract;
  robotList: WhitelistRobot[];
  config: WhitelistConfig;

  loopIndex: number;

  constructor(config: WhitelistConfig) {
    this.config = config;
    this.robotList = config.robots;
    let contract = config.contract;
    let provider = ethers.getDefaultProvider();
    this.whitelistContract = new Contract(contract.address, contract.abi, provider);

  }

  gasOptions(gas: BigNumber) {
    const multiplied = Math.floor(gas.toNumber() * 1.1);
    console.log(` Whitelist Helper Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied)
    };
  }


  start = (provider_: any) => {
    this.provider = provider_;

    this.startPool();
    const refreshBalance = setInterval(this.loop, this.config.interval);

  }

  startPool = async () => {

    this.loop();
  }

  loop = async () => {

    console.log("loop called index=" + this.loopIndex);

    const address = this.robotList[0].address;
    const privateKey = this.robotList[0].privateKey;

    let wallet: Wallet = new Wallet(privateKey, this.provider);

    const balance = await wallet.getBalance();
    console.log("balance:" + balance);

    if (balance.isZero()) {
      console.log(`index[${this.loopIndex}] ${address} balance is 0`);
    }
    const contract = this.whitelistContract.connect(wallet);


    let gas = await contract.estimateGas.join();
    let result = await contract.join(this.gasOptions(gas));

    try {
      result = await this.provider.waitForTransaction(result.hash, 1);
      console.log("result:" + JSON.stringify(result));
      this.loopIndex++;
    } catch (error) {

    }
  }
}