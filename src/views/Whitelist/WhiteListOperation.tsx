import React, { useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import useRobots from '../../hooks/useRobots';
import useBasisCash from '../../hooks/useBasisCash';
import { ethers } from 'ethers';

const WhiteListOperation: React.FC = () => {
  const { path } = useRouteMatch();
  const [robots] = useRobots();
  const { account, connect, ethereum } = useWallet();
  const basisCash = useBasisCash();


  const createWhiteList = () => {
    let tmp = "";
    for (let index = 0; index < 100; index++) {
      let randomWallet: ethers.Wallet = ethers.Wallet.createRandom();
      tmp += "WhiteList-" + (index + 1) + "\t" + randomWallet.address + "\t" + randomWallet.privateKey + "\r\n";
    }
    console.log(tmp);
    //to serilize
  }

  //step 2
  const sendETHToWhitelist = () => {
    if (basisCash) {
      basisCash.startSendETHToWhitelist();
    }
  }

  //step 3
  const JoinWhitelist = () => {
    if (basisCash) {
      basisCash.startJoinWhitelist();
    }
  }

  //need 
  const AirdropFBC = () => {

  }



  return (
    <Page>
      <div style={{ textAlign: 'center' }}>
        <PageHeader
          title="Welcome to Fire Basis Tools!"
        />
      </div>
      {/* <Center> */}
        {/* <Button onClick={createWhiteList} text="Step 1. Create 100 Whitelist Account" />
        <br /> */}
        <Button onClick={sendETHToWhitelist} text="Step 2. send ETH to 1-100 Whitelist Account" />
        <br />
        <Button onClick={JoinWhitelist} text="Step 3. 1-100 Join Whitelist" />
        <br />
        <Button onClick={AirdropFBC} text="Step 4. Do Airdrop FBC To Whitelist" />
      {/* </Center> */}
    </Page>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default WhiteListOperation;
