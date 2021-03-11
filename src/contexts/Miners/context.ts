import { createContext } from 'react';
import { Bank } from '../../basis-cash';
import { Miner } from '../../miner/minerConfig';

export interface MinersContext {
  miners: Miner[];
}

const context = createContext<MinersContext>({
  miners: []
});

export default context;
