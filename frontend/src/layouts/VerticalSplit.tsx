import React, { ReactElement } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface Props {
  columns: ReactElement[];
}

export const VerticalSplit = (props: Props) => (
  <FlexContainer>
    {props.columns.map((column: ReactElement, index: number) => (
      <FlexColumn children={column} key={index} />
    ))}
  </FlexContainer>
);
