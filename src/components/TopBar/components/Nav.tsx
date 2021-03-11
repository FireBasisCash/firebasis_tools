import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      <StyledLink exact activeClassName="active" to="/miner">Miner</StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/fbc">FBC</StyledLink>
      <StyledLink exact activeClassName="active" to="/fbs">FBS</StyledLink>
      <StyledLink exact activeClassName="active" to="/governance">Governance</StyledLink>
      <StyledLink exact activeClassName="active" to="/whitelist">WhiteList</StyledLink> */}
      {/* <StyledLink exact activeClassName="active" to="/bonds">Bonds</StyledLink>
      <StyledLink exact activeClassName="active" to="/boardroom">Boardroom</StyledLink> */}
      {/* <StyledLink2 href="https://snapshot.page/#/basiscash.eth" target="_blank" >Vote</StyledLink2> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-bottom: 10px 0 10px 0;
  display: block;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  };

  @media (max-width: 768px) {
    padding-left: 0;
    padding-bottom: 10px;
  };
`
const StyledLink2 = styled.a`
  color: ${props => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
`

export default Nav