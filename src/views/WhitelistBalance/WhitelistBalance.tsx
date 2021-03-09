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
import useEthBalance from '../../hooks/useEthBalance';
import useRobotEthBalance from '../../hooks/useRobotEthBalance';
import useRobotStatus from '../../hooks/useRobotStatus';
import { getDisplayBalance } from '../../utils/formatBalance';

type RobotItemProps = {
  address: string;
}

const RobotItem: React.FC<RobotItemProps> = ({ address }) => {
  const status = useRobotStatus(address);
  const balance = useRobotEthBalance(address);
  return (

    <div><StyledTitle>{address}:      {getDisplayBalance(balance)}        {status ? "Joined" : "No"}</StyledTitle>
      <br /></div>
  )
}

const WhiteListBalance: React.FC = () => {
  const { path } = useRouteMatch();
  const [robots] = useRobots();
  const { account, connect, ethereum } = useWallet();
  const basisCash = useBasisCash();

  const robotList = useMemo(() => {
    if (basisCash) {
      return Array.from(basisCash.config.whitelistConfig.robots);
    }

  }, [basisCash])

  return (
    <Page>
      <div style={{ textAlign: 'center' }}>
        <PageHeader
          title="WhitelistBalance"
        />
      </div>

      {
        robotList ? (
          robotList.map((robot, index) => {
            return (<RobotItem address={robot.address} key={index}></RobotItem>)
          })
          //<p>{JSON.stringify(robotList)}</p>
        ) : (<>false</>)
      }


    </Page>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.h4`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 ${(props) => props.theme.spacing[2]}px;
  padding: 0;
`;

export default WhiteListBalance;
