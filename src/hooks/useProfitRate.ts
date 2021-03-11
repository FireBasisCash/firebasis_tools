import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { Bank, PoolProfitRate } from '../basis-cash/types';

const useProfitRate = (bank: Bank) => {
  const [profitRate, setProfitRate] = useState<PoolProfitRate>();
  const basisCash = useBasisCash();

  const fetchProfit = useCallback(async () => {
    const profit:PoolProfitRate = await basisCash.getPoolProfit(bank);
    setProfitRate(profit);
  }, [basisCash?.isUnlocked, bank]);
  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchProfit().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchProfit, 3000);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash?.isUnlocked, bank, basisCash]);

  return profitRate;
};

export default useProfitRate;
