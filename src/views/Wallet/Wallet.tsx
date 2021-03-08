import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import useRobots from '../../hooks/useRobots';
import useBasisCash from '../../hooks/useBasisCash';
import { ethers } from 'ethers';

const Wallet: React.FC = () => {
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

  const createWhiteListWallet = () => {
    let tmp = "";
    for (let index = 0; index < 100; index++) {
      let randomWallet: ethers.Wallet = ethers.Wallet.createRandom();
      tmp += "WhiteList-" + (index+1) + "\t" + randomWallet.address + "\t" + randomWallet.privateKey + "\r\n";
    }
    console.log(tmp);
  }

  const createWallet = () => {

    let randomWallet: ethers.Wallet = ethers.Wallet.createRandom();
    console.log("WhiteList-1"+ "\t" + randomWallet.address + "\t" + randomWallet.privateKey);

  }

  return (
    <Page>
      <div style={{ textAlign: 'center' }}>
        <PageHeader
          title="Welcome to Fire Basis Tools!"
        />
      </div>
      <Button onClick={createWallet} text="Create Wallet" />
      <Button onClick={createWhiteListWallet} text="Create 100 Wallet" />

    </Page>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Wallet;
