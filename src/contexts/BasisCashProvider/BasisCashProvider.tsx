import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import config from '../../config';

export interface BasisCashContext {
  basisCash?: BasisCash;
}

export const Context = createContext<BasisCashContext>({ basisCash: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const { ethereum, account, connect } = useWallet();
  const [basisCash, setBasisCash] = useState<BasisCash>();

  useEffect(() => {
    debugger
    if(!ethereum)
    {
      connect("injected");
      return ;
    }

    if (!basisCash) {
      const basis = new BasisCash(config);
      setBasisCash(basis);
    } else {
      if (account && ethereum) {
        basisCash.unlockWallet(ethereum, account);
      } else {
        connect("injected");
      }
    }
  }, [ethereum, account]);

  return <Context.Provider value={{ basisCash }}>{children}</Context.Provider>;
};
