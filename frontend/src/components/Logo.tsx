import React from 'react';
import styled from 'styled-components';
import InlineSvg from 'react-inlinesvg';
import logoImage from '@images/logo-mono.svg';

const LogoSvg = styled(InlineSvg)`
  width: 50px;
`;

export const Logo = () => <LogoSvg src={logoImage} />;
