import React from 'react';
import styled from 'styled-components';
import LogoSvg from '@images/logo-mask.svg';

const Container = styled.div`
  position: relative;
`;

const AbsoluteSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

const EyeballSvg = styled(AbsoluteSvg)`
  fill: white;
  z-index: -2;
`;

const PupilSvg = styled(AbsoluteSvg)`
  fill: black;
  z-index: -1;
  transform: translate3d(16px, 0, 0);
  transition: transform 1s;
`;

interface Props {
  className?: string;
}

export const AnimatedLogo = (props: Props) => (
  <Container className={props.className}>
    <EyeballSvg>
      <rect x={5} y={5} width={93} height={128} />
    </EyeballSvg>
    <PupilSvg>
      <circle cx={52} cy={81} r={19} />
    </PupilSvg>
    <LogoSvg />
  </Container>
);
