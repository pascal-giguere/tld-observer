import React from 'react';
import styled from 'styled-components';
import LogoSvg from '@images/logo-mono.svg';

const StyledLogo = styled(LogoSvg)`
  width: 250px;
`;

export const Logo = () => <StyledLogo />;
