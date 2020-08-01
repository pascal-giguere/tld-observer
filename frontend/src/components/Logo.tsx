import React from 'react';
import styled from 'styled-components';
import LogoSvg from '@images/logo-color.svg';
import { theme } from '@styles/theme';

const StyledLogo = styled(LogoSvg)`
  width: 226px;

  @media only screen and (max-width: ${theme.breakpoints.phone.max}px) {
    display: block;
    width: 150px;
    margin: auto;
  }
`;

export const Logo = () => <StyledLogo />;
