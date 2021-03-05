import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

interface IconButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  onClick?: () => void,
  to?: string
}

const IconButton: React.FC<IconButtonProps> = ({ children, disabled, onClick, to }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {!!to ? (
        <StyledLink to={to}>{children}</StyledLink>
      ) : children}
    </StyledButton>
  )
}

interface StyledButtonProps {
  disabled?: boolean
}
/*
  box-shadow: 6px 6px 12px ${props => props.theme.color.grey[600]},
    -12px -12px 24px ${props => props.theme.color.grey[800]}aa;
 */

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${props => props.theme.color.green[!props.disabled ? 500 : 600]};
  border: 0;
  border-radius: 28px;
  color: ${props => !props.disabled ? props.theme.color.primary.main : props.theme.color.grey[500]};
  cursor: pointer;
  display: flex;
  font-weight: 700;
  height: 56px;
  justify-content: center;
  letter-spacing: 1px;
  outline: none;
  padding: 0;
  margin: 0;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  text-transform: uppercase;
  width: 56px;
  &:hover {
    background-color: ${props => props.theme.color.green[600]};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default IconButton