import { useCallback, useEffect, useMemo, useState } from 'react';
import useBasisCash from './useBasisCash';

const useProfitAllTVL = () => {
  const [fbcTVL, setFBCTVL] = useState<number>();
  const [fbsTVL, setFBSTVL] = useState<number>();
  const basisCash = useBasisCash();

  const fetchProfit = useCallback(async () => {
    setFBCTVL(await basisCash.getFBCPoolProfit());
    setFBSTVL(await basisCash.getFBSPoolProfit());
  }, [basisCash?.isUnlocked]);
  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchProfit().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchProfit, 3000);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash?.isUnlocked, basisCash]);

  return {fbcTVL, fbsTVL};
}

export default useProfitAllTVL;


