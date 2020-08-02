import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';
import detectIt from 'detect-it';
import { throttle } from 'lodash';
import { Ellipse, LineSegment, Point, isPointInsideEllipse, findClosestLineEllipseIntersection } from '@utils/geometry';
import LogoSvg from '@images/logo-mask.svg';

const EYE_CENTER_X = 52;
const EYE_CENTER_Y = 81;
const PUPIL_RADIUS = 19;
const PUPIL_MAX_TRANSLATE_X = 16;
const PUPIL_MAX_TRANSLATE_Y = 7;
const PUPIL_INITIAL_TRANSLATE_X = PUPIL_MAX_TRANSLATE_X;
const PUPIL_INITIAL_TRANSLATE_Y = 0;

const ORIGIN_POINT: Point = { posY: 0, posX: 0 };

const PUPIL_BOUNDARY_ELLIPSE: Ellipse = {
  center: ORIGIN_POINT,
  semiAxisX: PUPIL_MAX_TRANSLATE_X,
  semiAxisY: PUPIL_MAX_TRANSLATE_Y,
};

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
  transition: transform 1500ms;
`;

export type Position = { x: number; y: number };

interface Props {
  className?: string;
}

export const AnimatedLogo = (props: Props) => {
  const [ref, { x, y }] = useDimensions();
  const [pupilStaticTranslateX, setPupilStaticTranslateX] = useState(PUPIL_INITIAL_TRANSLATE_X);
  const [cursorTrackingEnabled, setCursorTrackingEnabled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Position | undefined>();
  const throttledSetCursorPosition = useCallback(throttle(setCursorPosition, 500), []);

  useEffect(() => {
    setTimeout(() => {
      setPupilStaticTranslateX(-PUPIL_MAX_TRANSLATE_X);
      if (detectIt.hasMouse) {
        setTimeout(() => setCursorTrackingEnabled(true), 2000);
      } else {
        setTimeout(() => setPupilStaticTranslateX(PUPIL_MAX_TRANSLATE_X), 2000);
      }
    }, 2500);
  }, []);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent): void => throttledSetCursorPosition({ x: e.pageX, y: e.pageY });
    window.addEventListener('mousemove', mouseMoveHandler);
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, []);

  let pupilTranslateX: number;
  let pupilTranslateY: number;

  const isPupilPositionDynamic: boolean = cursorTrackingEnabled && typeof cursorPosition !== 'undefined';
  if (isPupilPositionDynamic) {
    const cursorDeltaX: number = cursorPosition!.x - EYE_CENTER_X - x;
    const cursorDeltaY: number = cursorPosition!.y - EYE_CENTER_Y - y;
    const dynamicPosition: Position = getPupilDynamicPosition(cursorDeltaX, cursorDeltaY);
    pupilTranslateX = dynamicPosition.x;
    pupilTranslateY = dynamicPosition.y;
  } else {
    pupilTranslateX = pupilStaticTranslateX;
    pupilTranslateY = PUPIL_INITIAL_TRANSLATE_Y;
  }

  return (
    <Container className={props.className} ref={ref}>
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
  const cursorPoint: Point = { posX: cursorDeltaX, posY: cursorDeltaY };
  let pupilPoint: Point;
  if (isPointInsideEllipse(cursorPoint, PUPIL_BOUNDARY_ELLIPSE)) {
    pupilPoint = cursorPoint;
  } else {
    const cursorEyeCenterLine: LineSegment = { pointA: ORIGIN_POINT, pointB: cursorPoint };
    pupilPoint = findClosestLineEllipseIntersection(cursorEyeCenterLine, PUPIL_BOUNDARY_ELLIPSE);
  }
  return { x: pupilPoint.posX, y: pupilPoint.posY };
}
