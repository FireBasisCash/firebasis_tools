import { useCallback, useContext, useEffect, useState } from 'react';
import { Context as MinersContext } from '../contexts/Miners';
import { Miner } from '../miner/minerConfig';
import { MinerStatus } from '../miner/MinerStatus';
import useBasisCash from './useBasisCash';

const useMinerStatus = (miner: Miner) => {
  const [status, setStatus] = useState<MinerStatus>();
  const basisCash = useBasisCash();

  const fetchProfit = useCallback(async () => {
    const minerStatus: MinerStatus = await basisCash.getMinerStatus(miner);
    setStatus(minerStatus);
  }, [basisCash?.isUnlocked, miner]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchProfit().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchProfit, 3000);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash?.isUnlocked, miner, basisCash]);

  return status;
};

export default useMinerStatus;
