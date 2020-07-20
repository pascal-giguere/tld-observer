import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FlexColumn = styled.div<{ spacingPx: number }>`
  display: flex;
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
}

export const VerticalSplit = (props: Props) => (
  <FlexContainer>
    {props.children.map((column: JSX.Element, index: number) => (
      <FlexColumn children={column} spacingPx={props.spacingPx ?? 0} key={index} />
    ))}
  </FlexContainer>
);
