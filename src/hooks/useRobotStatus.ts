import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../basis-cash/ERC20';
import useBasisCash from './useBasisCash';
import config from '../config';

const useRobotStatus = (addr: string) => {
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const basisCash = useBasisCash();
  const address = addr;

  const fetchBalance = useCallback(async () => {
    const ret = await basisCash.checkWhitelist(address);
    // console.log("Balance: " + etherString);
    setIsJoined(ret);

  }, [basisCash?.isUnlocked]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash?.isUnlocked]);

  return isJoined;
};

export default useRobotStatus;
