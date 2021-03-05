import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { Bank } from '../../basis-cash';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useProfitRate from '../../hooks/useProfitRate';
import useRobots from '../../hooks/useRobots';
import { getDisplayBalance } from '../../utils/formatBalance';

const RobotCards: React.FC = () => {
  const [robots] = useRobots();
  return (
    <StyledCards>

      {robots.map((robot, i) => (

        <StyledCardWrapper key={i}>
          <Card>
            <CardContent>
              <StyledContent>
                <StyledTitle>{robot.name}</StyledTitle>

                <StyledDetailContainer>
                  <StyledDetailTitle>{robot.config.depositTokenName}: <StyledDetailContent>{robot.depositBalance} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>

                <StyledDetailContainer>
                  <StyledDetailTitle>{robot.config.eranTokenName}: <StyledDetailContent>{robot.earnBalance} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>

                <StyledDetailContainer>
                  <StyledDetailTitle>FBG: <StyledDetailContent>{robot.fbgBalance} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>

                <StyledDetailContainer>
                  <StyledDetailTitle>质押FBG次数: <StyledDetailContent>{robot.stakeCount} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>
                <StyledDetailContainer>
                  <StyledDetailTitle>质押FBG数量: <StyledDetailContent>{getDisplayBalance(robot.stakeAmount)} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>
                
                <StyledDetailContainer>
                  <StyledDetailTitle>共振FBG次数: <StyledDetailContent>{robot.swapCount} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>
                <StyledDetailContainer>
                  <StyledDetailTitle>共振消耗FBC数量: <StyledDetailContent>{getDisplayBalance(robot.swapAmount)} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>

                <StyledDetailContainer>
                  <StyledDetailTitle>提取{robot.config.eranTokenName}次数: <StyledDetailContent>{robot.rewardCount} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>
                <StyledDetailContainer>
                  <StyledDetailTitle>提取{robot.config.eranTokenName}数量: <StyledDetailContent>{getDisplayBalance(robot.rewardAmount)} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>

                <StyledDetailContainer>
                  <StyledDetailTitle>质押{robot.config.depositTokenName}次数: <StyledDetailContent>{robot.depostionCount} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>
                <StyledDetailContainer>
                  <StyledDetailTitle>质押{robot.config.depositTokenName}数量: <StyledDetailContent>{getDisplayBalance(robot.depostionAmount)} </StyledDetailContent></StyledDetailTitle>
                </StyledDetailContainer>
              </StyledContent>
            </CardContent>
          </Card>
        </StyledCardWrapper>
      )
      )}
    </StyledCards>
  );
};

interface BankCardProps {
  bank: Bank;
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  const profitRate = useProfitRate(bank);
  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <TokenSymbol symbol={bank.depositTokenName} size={54} />
            </CardIcon>
            <StyledTitle>{bank.name}</StyledTitle>

            <StyledDetailContainer>
              <StyledDetailTitle>Totally Supply: <StyledDetailContent>{profitRate ? profitRate.totalCount : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            <StyledDetailContainer>
              <StyledDetailTitle>TVL: <StyledDetailContent> {profitRate ? profitRate.tvl : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            <StyledDetailContainer>
              <StyledDetailTitle>APY: <StyledDetailContent>{profitRate ? <StyledDetailPrice>{profitRate.apy}</StyledDetailPrice> : 'loading'} </StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>

            <StyledDetailContainer style={{ marginBottom: 22 }}>
              <StyledDetailTitle>APD: <StyledDetailContent>{profitRate ? <StyledDetailPrice>{profitRate.apd}</StyledDetailPrice> : 'loading'}</StyledDetailContent></StyledDetailTitle>
            </StyledDetailContainer>
            <Button text="Select" to={`/bank/${bank.contract}`} />
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
  display: block;
  flex-direction: column;
  align-items: center;
  width: 900px;
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
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
  display: inline-block;
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
  display: inline-block;
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

export default RobotCards;
