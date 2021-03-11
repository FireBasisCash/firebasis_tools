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

  const [{ cash, bond, share, governance }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    // const [cash, share, governance] = await Promise.all([
    //   basisCash.getCashStatFromUniswap(),
    //   // basisCash.getBondStat(),
    //   basisCash.getShareStat(),
    //   basisCash.getGovernanceStat()
    // ]);
    if (basisCash.isUnlocked) {
      
      let cash = await basisCash.getCashStatFromUniswap();

      let share = await basisCash.getShareStat();
      let governance = await basisCash.getGovernanceStat();
      if (Date.now() < config.bondLaunchesAt.getTime()) {
        bond.priceInUsdt = '-';
      }
      console.log("Home cash" + cash);
      setStats({ cash, bond, share, governance });

    }

  }, [basisCash?.isUnlocked, basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash?.isUnlocked, basisCash]);

  const cashAddr = useMemo(() => basisCash?.FBC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.FBS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.FBB.address, [basisCash]);
  const governanceAddr = useMemo(() => basisCash?.FBG.address, [basisCash]);

  return (
    <Page>
      <div style={{ textAlign: 'center' }}>
        <PageHeader
          subtitle="Tools"
          title="Welcome to Fire Basis Tool!"
        />
      </div>
      <Spacer size="md" />
      <CardWrapper>
        
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
