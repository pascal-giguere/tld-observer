import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import detectIt from 'detect-it';
import { throttle } from 'lodash';
import LogoSvg from '@images/logo-mask.svg';

const EYE_CENTER_X = 52;
const EYE_CENTER_Y = 81;
const PUPIL_RADIUS = 19;
const PUPIL_MAX_TRANSLATE_X = 16;
const PUPIL_MAX_TRANSLATE_Y = 5;
const PUPIL_INITIAL_TRANSLATE_X = PUPIL_MAX_TRANSLATE_X;
const PUPIL_INITIAL_TRANSLATE_Y = 0;

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

const PupilSvg = styled(AbsoluteSvg)<{ translateX: number; translateY: number }>`
  fill: black;
  z-index: -1;
  transform: translate3d(${(props) => `${props.translateX}px, ${props.translateY}px, 0`});
  transition: transform 1s;
`;

export type Position = { x: number; y: number };

interface Props {
  className?: string;
}

export const AnimatedLogo = (props: Props) => {
  const [pupilStaticTranslateX, setPupilStaticTranslateX] = useState(PUPIL_INITIAL_TRANSLATE_X);
  const [cursorTrackingEnabled, setCursorTrackingEnabled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Position | undefined>();
  const throttledSetCursorPosition = useCallback(throttle(setCursorPosition, 500), []);

  useEffect(() => {
    setTimeout(() => {
      setPupilStaticTranslateX(-PUPIL_MAX_TRANSLATE_X);
      if (detectIt.hasMouse) {
        setTimeout(() => setCursorTrackingEnabled(true), 1500);
      } else {
        setTimeout(() => setPupilStaticTranslateX(PUPIL_MAX_TRANSLATE_X), 1500);
      }
    }, 2500);
  }, []);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent): void => throttledSetCursorPosition({ x: e.offsetX, y: e.offsetY });
    window.addEventListener('mousemove', mouseMoveHandler);
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, []);

  let pupilTranslateX: number;
  let pupilTranslateY: number;

  const isPupilPostionDynamic: boolean = cursorTrackingEnabled && typeof cursorPosition !== 'undefined';
  if (isPupilPostionDynamic) {
    const cursorDeltaX: number = cursorPosition!.x - EYE_CENTER_X;
    const cursorDeltaY: number = cursorPosition!.y - EYE_CENTER_Y;
    const { x, y } = getPupilDynamicPosition(cursorDeltaX, cursorDeltaY);
    pupilTranslateX = x;
    pupilTranslateY = y;
  } else {
    pupilTranslateX = pupilStaticTranslateX;
    pupilTranslateY = PUPIL_INITIAL_TRANSLATE_Y;
  }

  return (
    <Container className={props.className}>
      <EyeballSvg>
        <rect x={5} y={5} width={93} height={128} />
      </EyeballSvg>
      <PupilSvg translateX={pupilTranslateX} translateY={pupilTranslateY}>
        <circle cx={EYE_CENTER_X} cy={EYE_CENTER_Y} r={PUPIL_RADIUS} />
      </PupilSvg>
      <LogoSvg />
    </Container>
  );
};

function getPupilDynamicPosition(cursorDeltaX: number, cursorDeltaY: number): Position {
  const cappedDeltaX: number = absoluteThreshold(cursorDeltaX, PUPIL_MAX_TRANSLATE_X);
  const cappedDeltaY: number = absoluteThreshold(cursorDeltaY, PUPIL_MAX_TRANSLATE_Y);
  return { x: cappedDeltaX, y: cappedDeltaY };
}

function absoluteThreshold(value: number, threshold: number): number {
  if (value > threshold) return threshold;
  if (value < -threshold) return -threshold;
  return value;
}
