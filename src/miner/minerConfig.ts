
export type Miner =
{
  address: string;
  privateKey: string;
  index: number;
  name: string;
  pool: string;
  stakeToken: string;
}
export type ContractConfig = {
address: string;
abi: any[];
}

export type MinerConfig = {
miner: Miner[];
pools: { [name: string]: ContractConfig }
interval: number;
}

export const minerConfig: { [name: string]: MinerConfig } =
{
goerli: {
  miner: require("./miner.json"),
  pools: require('../basis-cash/deployments/deployments.goerli.json'),
  interval: 60000
},
mainnet: {
  miner: require("./miner.json"),
  pools: require('../basis-cash/deployments/deployments.mainnet.json'),
  interval: 60000
}
,
hecotest: {
  miner: require("./miner.json"),
  pools: require('../basis-cash/deployments/deployments.heco_test.json'),
  interval: 60000
}
,
heco: {
  miner: require("./miner.json"),
  pools: require('../basis-cash/deployments/deployments.heco.json'),
  interval: 60000
}
}