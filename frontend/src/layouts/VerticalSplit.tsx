import React from 'react';
import styled, { css } from 'styled-components';

const FlexContainer = styled.div<{ breakpointPx?: number }>`
  display: flex;
  flex-direction: row;
  width: 100%;

  ${(props) =>
    props.breakpointPx &&
    css`
      @media only screen and (max-width: ${props.breakpointPx}px) {
        display: block;
      }
    `}
`;

const FlexColumn = styled.div<{ spacingPx: number }>`
  flex-direction: column;
  flex: 1;
  position: relative;
  margin: 0 ${(props) => props.spacingPx}px;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

interface Props {
  children: JSX.Element[];
  spacingPx?: number;
  breakpointPx?: number;
}

export const VerticalSplit = (props: Props) => (
  <FlexContainer breakpointPx={props.breakpointPx}>
    {props.children.map((column: JSX.Element, index: number) => (
      <FlexColumn key={index} children={column} spacingPx={props.spacingPx ?? 0} />
    ))}
  </FlexContainer>
);
