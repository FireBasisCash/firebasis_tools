import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import Notice from '../../components/Notice';

const Home: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      // basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);

    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInUsdt = '-';
    }
    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash]);

  const cashAddr = useMemo(() => basisCash?.FBC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.FBS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.FBB.address, [basisCash]);
  const governanceAddr = useMemo(() => basisCash?.FBG.address, [basisCash]);

  return (
    <Page>
      <PageHeader
        subtitle="Buy, sell, and provide liquidity for Fire Basis Cash and Fire Basis Shares on Uniswap"
        title="Welcome to Fire Basis Cash!"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="Fire Basis Cash"
          symbol="FBC"
          color="#5B6C94"
          supplyLabel="Circulating Supply"
          address={cashAddr}
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard
          title="Fire Basis Share"
          symbol="FBS"
          color="#5B6C94"
          address={shareAddr}
          stat={share}
        />
        <Spacer size="lg" />
        {/* <HomeCard
          title="Basis Bond"
          symbol="BAB"
          color="#5B6C94"
          address={bondAddr}
          stat={bond}
        /> */}
      </CardWrapper>
    </Page>
  );
};

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledNoticeContainer = styled.div`
  max-width: 768px;
  width: 90vw;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

export default Home;
