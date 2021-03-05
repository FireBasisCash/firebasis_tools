import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBasisCash from '../../hooks/useBasisCash';
import config, { robotsConfig } from '../../config';
import { Robot } from '../../basis-cash/Tools';

const Robots: React.FC = ({ children }) => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const robots: Robot[] = [];

    robotsConfig.forEach(robotConifg => {
      const robot = new Robot(robotConifg, basisCash.config.deployments);
      if (robot) {
        console.log("robot init:" + robot.name);
        robots.push(robot);
      }
    });

    setRobots(robots);

  }, [basisCash, basisCash?.isUnlocked, setRobots]);

  
  useEffect(() => {
    if (basisCash) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ robots }}>{children}</Context.Provider>;
};

export default Robots;
