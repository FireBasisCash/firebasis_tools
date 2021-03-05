import { useContext } from 'react';
import { Context as RobotsContext } from '../contexts/Robots';

const useRobots = () => {
  const { robots } = useContext(RobotsContext);
  return [robots];
};

export default useRobots;
