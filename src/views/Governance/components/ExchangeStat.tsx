import React from 'react';
import styled from 'styled-components';
import Card from '../../../components/Card';

interface ExchangeStatProps {
  tokenName: string;
  description: string;
  count: string;
}

const ExchangeStat: React.FC<ExchangeStatProps> = ({ tokenName, description, count }) => {
  return (
    <Card>
      <StyledCardContentInner>
        <StyledCardTitle>{`${count}`}</StyledCardTitle>
        <StyledDesc>{description}</StyledDesc>
      </StyledCardContentInner>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.black[200]};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  text-align: center;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[2]}px;
`;

export default ExchangeStat;
