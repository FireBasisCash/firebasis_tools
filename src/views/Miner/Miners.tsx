import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import Button from '../../components/Button';
import styled from 'styled-components';

import imgBank from '../../assets/img/img_bank.png';
import useBasisCash from '../../hooks/useBasisCash';
import useAccount from '../../hooks/useAccount';
import MinerCards from './MinerCards';

const Miners: React.FC = () => {
  const { path } = useRouteMatch();
  const basisCash = useBasisCash();
  const { account, connect } = useAccount();


  return (
    <Switch>
      <Page>

        <PageHeader
          title={"Miner"}
          subtitle={"Mine status"}
        />
        {account ? (
          <MinerCards />
        ) :
          (
            <Center>
              <Button onClick={() => { connect() }} text="Unlock Wallet" />
            </Center>
          )
        }

      </Page>
    </Switch>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Miners;
