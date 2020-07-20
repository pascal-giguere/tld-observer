import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';

const BOX_INSET = '8px';

const Wrapper = styled.div`
  position: relative;
  padding-top: 18px;
`;

const Title = styled.div<{ boxStyle: BoxStyle }>`
  position: absolute;
  top: 0;
  left: 40px;
  font-family: 'Circular Std', sans-serif;
  font-size: 17px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 15px;
  background-color: ${(props) => backgroundColorForBoxStyle(props.boxStyle)};
  border: 4px solid ${theme.colors.dark};
  box-shadow: -${BOX_INSET} ${BOX_INSET} 0 0 ${theme.colors.dark};

  ${(props) =>
    props.boxStyle === BoxStyle.emphasized &&
    `
      margin-left: ${BOX_INSET};
    `}
`;

const Container = styled.div<{ boxStyle: BoxStyle }>`
  border: 4px solid ${theme.colors.dark};
  padding: 60px 28px 28px 28px;
  background-color: ${(props) => backgroundColorForBoxStyle(props.boxStyle)};

  ${(props) =>
    props.boxStyle === BoxStyle.emphasized &&
    `
      margin: 0 0 ${BOX_INSET} ${BOX_INSET};
      box-shadow: -${BOX_INSET} ${BOX_INSET} 0 0 ${theme.colors.dark};
    `}
`;

export enum BoxStyle {
  simple = 'simple',
  emphasized = 'emphasized',
}

interface Props {
  style: BoxStyle;
  title: string;
  children: (ReactElement | HTMLElement)[] | string;
}

function backgroundColorForBoxStyle(boxStyle: BoxStyle): string {
  switch (boxStyle) {
    case BoxStyle.simple:
      return theme.colors.primary;
    case BoxStyle.emphasized:
      return theme.colors.light;
  }
}

export const Box = (props: Props) => (
  <Wrapper>
    <Title boxStyle={props.style}>{props.title}</Title>
    <Container boxStyle={props.style}>{props.children}</Container>
  </Wrapper>
);
