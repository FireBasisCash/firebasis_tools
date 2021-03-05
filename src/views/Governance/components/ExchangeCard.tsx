import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import useBasisCash from '../../../hooks/useBasisCash';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../basis-cash/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import { FBGSwapperInfo } from '../../../basis-cash/types';
import { AlignCenter } from 'react-feather';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
  rateDesc: string;
  levelDesc: string;
  levelCountDesc: string;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
  rateDesc,
  levelDesc,
  levelCountDesc
}) => {

  const catchError = useCatchError();
  const basisCash = useBasisCash();
  const {
    contracts: { Treasury },
  } = useBasisCash();
  const [approveStatus, approve] = useApprove(fromToken, basisCash.FBGSwapper.address);

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardTitle>{`${action} ${fromToken.symbol} To ${toToken.symbol}`}</StyledCardTitle>
          <StyledExchanger>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={fromToken.symbol} size={54} />
              </StyledCardIcon>
              <Label text={fromTokenName} variant="normal" align="center" />
            </StyledToken>
            <StyledExchangeArrow>
              <FontAwesomeIcon icon={faArrowRight} />
            </StyledExchangeArrow>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={toToken.symbol} size={54} />
              </StyledCardIcon>
              <Label text={toTokenName} variant="normal" align="center" />
            </StyledToken>
          </StyledExchanger>
          <StyledDescContainer>
            <StyledDescTitle>{`Rate:`}</StyledDescTitle>
            <StyledDesc>{rateDesc}</StyledDesc>
          </StyledDescContainer>

          <StyledDescContainer>
            <StyledDescTitle>{`CurrentLevel:`}</StyledDescTitle>
            <StyledDesc>{levelDesc}</StyledDesc>
          </StyledDescContainer>

          <StyledDescContainer>
            <StyledDescTitle>{`LevelCount:`}</StyledDescTitle>
            <StyledDesc>{levelCountDesc}</StyledDesc>
          </StyledDescContainer>

          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED && !disabled ? (
              <Button
                disabled={
                  approveStatus == ApprovalState.PENDING ||
                  approveStatus == ApprovalState.UNKNOWN
                }
                onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
                text={`Approve ${fromTokenName}`}
              />
            ) : (
                <Button
                  text={disabledDescription || action}
                  onClick={onPresent}
                  disabled={disabled}
                />
              )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[300]};
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;


const StyledDescContainer = styled.div`
  display: flex;
  width:100%;
  padding-left:40px;
  padding-right:40px;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  text-align:right;
  width:100%;
`;
const StyledDescTitle = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  width:100px;
  text-align:left;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.color.grey[300]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`;



const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default ExchangeCard;
