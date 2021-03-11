import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBasisCash from '../../hooks/useBasisCash';
import { Bank } from '../../basis-cash';
import config, { bankDefinitions } from '../../config';
import { Miner, minerConfig } from '../../miner/minerConfig';

const Miners: React.FC = ({ children }) => {
  const [miners, setMiners] = useState<Miner[]>([]);
  const basisCash = useBasisCash();

  useEffect(() => {
    if (basisCash) {
      if (miners.length <= 0) {
        let env = "hecotest";
        if (process.env.NODE_ENV == "production")
          env = "heco";
        setMiners(minerConfig[env].miner);
      }
    }
  }, [basisCash, basisCash?.isUnlocked]);

  return <Context.Provider value={{ miners }}>{children}</Context.Provider>;
};

export default Miners;
