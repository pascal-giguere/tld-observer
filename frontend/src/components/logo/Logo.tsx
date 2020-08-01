import React from 'react';
import detectIt from 'detect-it';
import styled, { css } from 'styled-components';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { AnimatedLogo } from '@components/logo/AnimatedLogo';
import { theme } from '@styles/theme';
import LogoSvg from '@images/logo-color.svg';

const logoStyle = css`
  width: 226px;

  @media only screen and (max-width: ${theme.breakpoints.phone.max}px) {
    display: block;
    width: 150px;
    margin: auto;
  }
`;

const StyledStaticLogo = styled(LogoSvg)`
  ${logoStyle}
`;

const StyledAnimatedLogo = styled(AnimatedLogo)`
  ${logoStyle}
`;

export const Logo = () => {
  const windowWidth: number = useWindowWidth();
  const isPhoneWidth: boolean = windowWidth <= theme.breakpoints.phone.max;
  const shouldAnimateLogo: boolean = detectIt.hasMouse && !isPhoneWidth;
  return shouldAnimateLogo ? <StyledAnimatedLogo /> : <StyledStaticLogo />;
};
