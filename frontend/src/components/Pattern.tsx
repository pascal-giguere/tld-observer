import React from 'react';
import { theme } from '@styles/theme';

const CIRCLE_RADIUS_PX = 2.3;
const CIRCLE_SPACING_PX = 19;

interface Props {
  key: string;
  className?: string;
}

export const Pattern = (props: Props) => (
  <svg width='100%' height='100%' className={props.className}>
    <pattern
      id={`pattern-${props.key}`}
      width={CIRCLE_SPACING_PX}
      height={CIRCLE_SPACING_PX}
      patternUnits='userSpaceOnUse'
      patternContentUnits='userSpaceOnUse'
    >
      <circle cx={CIRCLE_RADIUS_PX} cy={CIRCLE_RADIUS_PX} r={CIRCLE_RADIUS_PX} fill={theme.colors.dark} />
    </pattern>
    <rect width='100%' height='100%' fill={`url(#pattern-${props.key})`} />
  </svg>
);
