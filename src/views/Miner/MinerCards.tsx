import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { Bank } from '../../basis-cash';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';
import useProfitRate from '../../hooks/useProfitRate';
import formatBlockTimeStamp from '../../utils/dateFormater';
import useProfitAllTVL from '../../hooks/useProfitRateAllTVL';
import { getDisplayBalance } from '../../utils/formatBalance';
import { red } from '../../theme/colors';
import useMiners from '../../hooks/useMiners';
import { Miner } from '../../miner/minerConfig';
import useMinerStatus from '../../hooks/useMinerStatus';

const MinerCards: React.FC = () => {
  const [miners] = useMiners();

  return (
    <StyledCards>
      <StyledRow>
        {miners.map((bank, i) => (
          <React.Fragment key={bank.name}>
            <MinerCard miner={bank} />
          </React.Fragment>
        ))}
      </StyledRow>
    </StyledCards>
  );
};

interface MinerCardProps {
  miner: Miner;
}

const MinerCard: React.FC<MinerCardProps> = ({ miner }) => {
  const minerStatus = useMinerStatus(miner);
  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <TokenSymbol symbol={miner.stakeToken ? miner.stakeToken : "HT"} size={54} />
            </CardIcon>
            <StyledTitle>{miner.name}</StyledTitle>

            <StyledDetailContainer>
              <StyledDetailTitle>Earnings: <StyledDetailContent>{minerStatus ? getDisplayBalance(minerStatus.earningBalance) : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>
            <StyledDetailContainer>
              <StyledDetailTitle>FBG Staked: <StyledDetailContent>{minerStatus ? getDisplayBalance(minerStatus.fbgStaked) : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>
            <StyledDetailContainer>
              <StyledDetailTitle>Token Staked: <StyledDetailContent>{minerStatus ? getDisplayBalance(minerStatus.tokenStaked) : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            <StyledDetailContainer>
              <StyledDetailTitle>ETH balance: <StyledDetailContent>{minerStatus ? getDisplayBalance(minerStatus.ethBalance) : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            <StyledDetailContainer>
              <StyledDetailTitle>FBG balance: <StyledDetailContent> {minerStatus ? getDisplayBalance(minerStatus.fbgBalance) : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            <StyledDetailContainer>
              <StyledDetailTitle>FBC balance: <StyledDetailContent>{minerStatus ? getDisplayBalance(minerStatus.fbcBalace) : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            {
              miner.stakeToken ? (<StyledDetailContainer style={{ marginBottom: 22 }}>
                <StyledDetailTitle>{miner.stakeToken} Balance: <StyledDetailContent>{minerStatus ? getDisplayBalance(minerStatus.tokenBalance) : 'loading'}</StyledDetailContent></StyledDetailTitle>
              </StyledDetailContainer>) : (<></>)
            }

          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledCardAccent = styled.div`
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

const StyledCardSuperAccent = styled.div`
  border-radius: 12px;
  filter: blur(8px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`;

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
  margin: 12px;
`;

const StyledTitle = styled.h4`
  color: #031D5B;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 ${(props) => props.theme.spacing[2]}px;
  padding: 0;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`;

const StyledDetailContainer = styled.div`
  color: #5B6C94;
  width:100%;
  margin-bottom: 10px;
`;

const StyledDetailTitle = styled.div`
  text-align:left;
  width:100%;
`;



const StyledDetailContent = styled.div`
  float: right;
`;

const StyledDetailPrice = styled.div`
  font-weight: 900;
  color: #031D5B;
  font-size: 16px;
`;

const HighlightStyledDetailPrice = styled.div`
  font-weight: 900;
  color: red;
  font-size: 16px;
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveBankTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const TVLWarpperDiv = styled.div`
  background: white;
  width: 280px;
  color: #031D5B;
  text-align: center;
  height: 58px;
  line-Height: 58px;
  font-weight: bold;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px #616161;
  border: 1px solid #212121;
`;

export default MinerCards;
