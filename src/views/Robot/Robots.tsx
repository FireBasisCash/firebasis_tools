import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import RobotCards from './RobotCards';
import useRobots from '../../hooks/useRobots';
import useBasisCash from '../../hooks/useBasisCash';
import { ethers } from 'ethers';

const Robots: React.FC = () => {
  const { path } = useRouteMatch();
  const [robots] = useRobots();
  const { account, connect, ethereum } = useWallet();
  const basisCash = useBasisCash();

  const startAllRobots = () => {
    let provider = new ethers.providers.Web3Provider(ethereum, basisCash.config.chainId);

    robots.forEach(robot => {
      robot.start(provider);
    });
  }

  return (
    <Page>
      <PageHeader
        title="Welcome to Fire Basis Tools!"
      />

      {!!account ? (
        <div style={{ textAlign: 'center' }}>
          <Center>
            <div style={{ textAlign: 'center', width: 140 }}>
              <Button text="Start Robots 🏄" variant="secondary" size="sm" onClick={startAllRobots} />
            </div>
          </Center>
          <RobotCards />
        </div>

      ) : (
          <Center>
            <Button onClick={() => connect('injected')} text="Unlock Wallet" />
          </Center>
        )}
    </Page>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Robots;
