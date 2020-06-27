import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div``;

interface Props {
  leftComponent: any;
  rightComponent: any;
}

export const VerticalSplit = (props: Props) => (
  <FlexContainer>
    <div children={props.leftComponent} />
    <div children={props.rightComponent} />
  </FlexContainer>
);
