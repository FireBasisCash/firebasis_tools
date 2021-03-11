import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../basis-cash';
import Accelerator from './components/Accelerator';
import StakeETH from './components/StakeETH';

import imgBank from '../../assets/img/img_bank.png';
import useAccount from '../../hooks/useAccount';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();
  const bank = useBank(bankId);
  console.log("bank:" + bank);
  const { account } = useAccount();
  const { onRedeem } = useRedeem(bank);

  const body = useMemo(
    () => {

      if (account && bank) {
        return (<><PageHeader
          subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
          title={bank?.name}
        />
          <StyledBank>
            {
              bank.started === true ? (<></>) : (<StyledBankGrey></StyledBankGrey>)
            }
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Harvest bank={bank} />
              </StyledCardWrapper>
              <Spacer />
              <StyledCardWrapper>
                {bank.depositTokenName == "HT" ? (<StakeETH bank={bank} />) : (<Stake bank={bank} />)}
              </StyledCardWrapper>
              {bank.accelerator ? (
                <StyledCardWrapper>
                  <Accelerator bank={bank} />
                </StyledCardWrapper>
              ) : (<div></div>)}
            </StyledCardsWrapper>
            <Spacer size="lg" />
            {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
            <Spacer size="lg" />
            <div>
              <Button onClick={onRedeem} text="Settle & Withdraw" />
            </div>
            <Spacer size="lg" />
          </StyledBank>
        </>)
      } else if (account) {
        return <BankNotFound />
      } else {
        return <UnlockWallet />
      }
    }, [account, bank])

  useEffect(() => {
    console.log("account:" + account + "\tbank:" + bank);
  },[account])

  return body;

  // return account && bank ? (
  //   <>

  // ) : !bank ? (
  //   <BankNotFound />
  // ) : (
  //   <UnlockWallet />
  // );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('FBC')) {
    pairName = 'FBC-USDT pair';
    uniswapUrl = "";//'https://app.uniswap.org/#/add/0x3449FC1Cd036255BA1EB19d65fF4BA2b8903A69a/0x6B175474E89094C44Da98b954EedeAC495271d0F';
  } else {
    pairName = 'FBS-USDT pair';
    uniswapUrl = "";//'https://app.uniswap.org/#/add/0xa7ED29B253D8B4E3109ce07c80fc570f81B63696/0x6B175474E89094C44Da98b954EedeAC495271d0F';
  }
  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {` Provide liquidity to ${pairName} on MDEX  `}
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon={imgBank}
        title="Not Found"
        subtitle="You've hit a bank just robbed by unicorns."
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const StyledBankGrey = styled.div`
  width: 100%;
  background: grey;
  height: 100%;
  border-radius: 12px;
  opacity: 0.6;
  position: absolute;
  text-align: center;
`;

const StyledBank = styled.div`
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledUniswapLPGuide = styled.div`
  margin: -24px auto 48px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
