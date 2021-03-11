import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import ERC20 from '../basis-cash/ERC20';
import useBasisCash from './useBasisCash';

const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(null);
  const { account } = useWallet();
  const basisCash = useBasisCash();
  
  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    console.log(`Allowance: ${allowance.toString()} ${token.symbol} for ${spender}`);
    setAllowance(allowance);
  }, [basisCash?.isUnlocked,account, spender, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
    }
  }, [basisCash?.isUnlocked,account, spender, token, pendingApproval]);

  return allowance;
};

export default useAllowance;
