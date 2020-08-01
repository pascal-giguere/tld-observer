import React from 'react';
import styled, { css } from 'styled-components';
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
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 11px 15px;
  background-color: ${(props) => backgroundColorForBoxStyle(props.boxStyle)};
  border: 4px solid ${theme.colors.dark};
  box-shadow: -${BOX_INSET} ${BOX_INSET} 0 0 ${theme.colors.dark};
  z-index: 2;

  ${(props) =>
    props.boxStyle === BoxStyle.emphasized &&
    css`
      margin-left: ${BOX_INSET};
    `}
`;

const Container = styled.div<{ boxStyle: BoxStyle; disabled: boolean }>`
  position: relative;
  border: 4px solid ${theme.colors.dark};
  padding: 66px 28px 28px 28px;
  background-color: ${(props) => backgroundColorForBoxStyle(props.boxStyle)};

  ${(props) =>
    props.boxStyle === BoxStyle.emphasized &&
    css`
      margin: 0 0 ${BOX_INSET} ${BOX_INSET};
      box-shadow: -${BOX_INSET} ${BOX_INSET} 0 0 ${theme.colors.dark};
    `}

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        background-color: ${backgroundColorForBoxStyle(props.boxStyle)};
        opacity: 0.8;
      }
    `}
`;

export enum BoxStyle {
  simple = 'simple',
  emphasized = 'emphasized',
}

interface Props {
  style: BoxStyle;
  title: string;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
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
    <Container boxStyle={props.style} disabled={props.disabled ?? false}>
      {props.children}
    </Container>
  </Wrapper>
);
