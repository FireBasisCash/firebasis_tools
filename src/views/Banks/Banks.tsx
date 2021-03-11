import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import BankCards from './BankCards';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';

import imgBank from '../../assets/img/img_bank.png';
import useBasisCash from '../../hooks/useBasisCash';
import useAccount from '../../hooks/useAccount';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const basisCash = useBasisCash();
  const { account, connect } = useAccount();

  let title = "Pick a Pool.";
  let subTitle = "Earn Fire Basis Shares by providing liquidity";
  if (path == '/fbc') {
    title = "Pick a Pool.";
    subTitle = "Earn Fire Basis Cash by staking";
  }

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={imgBank}
            title={title}
            subtitle={subTitle}
          />
          {account ? (
            <BankCards />
          ) :
            (
              <Center>
                <Button onClick={() => { connect() }} text="Unlock Wallet" />
              </Center>
            )
          }

        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
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

export default Banks;
