import { useContext, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { Context } from '../contexts/BasisCashProvider';

const useAccount = () => {
  const {account,connect} = useContext(Context);
  // const basisCash = useBasisCash();
  // const  = useContext(Context);

  // useEffect(() => {
  //   if (basisCash && basisCash.isUnlocked) {
  //     setAccount(basisCash.myAccount);
  //   }
  // }, [basisCash, basisCash?.isUnlocked])

  // const connect = async () => {
  //   const account: string[] = await basisCash.requestAccount();
  //   if (account) {
  //     basisCash.unlockWallet(ethereum, account[0]);
  //     setAccount(account[0]);
  //   }
  // }

  return { account, connect };
};

export default useAccount;
