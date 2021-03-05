import { createContext } from 'react';
import { Bank } from '../../basis-cash';
import { Robot } from '../../basis-cash/Tools';

export interface RobotsContext {
  robots: Robot[];
}

const context = createContext<RobotsContext>({
  robots: [],
});

export default context;
