import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStakeETH = (bank: Bank) => {
  const basisCash = useBasisCash();

  const handleStakeETH = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, 18);
      const sum = `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`;
      basisCash.stakeETH(bank.contract, sum, amountBn)
    },
    [bank, basisCash],
  );

  // const handleStake = useCallback(
  //   (amount: string) => {
  //     const amountBn = parseUnits(amount, bank.depositToken.decimal);
  //     handleTransactionReceipt(
  //       basisCash.stake(bank.contract, amountBn),
  //       `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
  //     );
  //   },
  //   [bank, basisCash],
  // );

  return { onStakeETH: handleStakeETH };
};

export default useStakeETH;
