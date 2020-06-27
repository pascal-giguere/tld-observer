import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export enum BoxStyle {
  simple = 'simple',
  emphasized = 'emphasized',
}

interface Props {
  style: BoxStyle;
}

export const Box = (props: Props) => <Container />;
