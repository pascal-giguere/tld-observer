import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 4px solid black;
  padding: 20px;
  margin-top: 10px;
`;

export enum BoxStyle {
  simple = 'simple',
  emphasized = 'emphasized',
}

interface Props {
  style: BoxStyle;
  title: string;
}

export const Box = (props: Props) => <Container />;
