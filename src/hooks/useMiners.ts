import { useContext } from 'react';
import { Context as MinersContext } from '../contexts/Miners';

const useBanks = () => {
  const { miners } = useContext(MinersContext);
  return [miners];
};

export default useBanks;
