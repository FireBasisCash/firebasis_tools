import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import config from '../../config';
import Web3Object from 'web3';

export interface BasisCashContext {
  basisCash?: BasisCash;
  account?: string;
  connect?: () => void;
}

export const Context = createContext<BasisCashContext>({ basisCash: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const [basisCash, setBasisCash] = useState<BasisCash>();
  const [account, setAccount] = useState<string>();

  const initWeb3 = () => {
    let currentProvider = null
    if (typeof ethereum !== 'undefined') {
      ethereum.autoRefreshOnNetworkChange = false
      currentProvider = ethereum
      ethereum.enable()
    } else if (typeof web3 !== 'undefined') {
      currentProvider = web3.currentProvider
    }
    if (currentProvider) {
      // let web3Object = new Web3Object(currentProvider)
      const basis = new BasisCash(config, currentProvider);
      // this.web3 = cfg.defaultProvider ? new Web3Object(cfg.defaultProvider) : new Web3Object();
      setBasisCash(basis);
    }
  }

  const connect = useCallback(async () => {
    const account: string[] = await basisCash.requestAccount();
    basisCash.unlockWallet(ethereum, account[0]);
    setAccount(account[0]);
  }, [basisCash?.isUnlocked]);


  useEffect(() => {
    if (!basisCash) {
      initWeb3();
      return;
    }

    if (!basisCash.isUnlocked) {
      connect();
    }
  }, [basisCash])

  return <Context.Provider value={{ basisCash, account, connect }}>{children}</Context.Provider>;
};
