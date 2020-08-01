import React from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { Box, BoxStyle } from '@components/Box';

const Wrapper = styled.div`
  margin: 60px auto;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  height: 48px;
  line-height: 48px;
  margin: 12px 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  display: inline-block;
  height: 100%;
  padding: 0 10px 0 4px;
  font-size: 18px;
  color: ${theme.colors.primary};
  background-color: ${theme.colors.dark};

  @media only screen and (max-width: ${theme.breakpoints.smallPhone.max}px) {
    font-size: 16px;
  }
`;

const Detail = styled.span`
  font-style: italic;
  padding: 0 18px;
`;

export interface ListItem {
  label: string;
  detail: string;
}

interface Props {
  title: string;
  children: ListItem[];
}

export const ListBox = (props: Props) => (
  <Wrapper>
    <Box style={BoxStyle.simple} title={props.title}>
      {props.children.map((item: ListItem, index: number) => (
        <Row key={index}>
          <Label>{item.label}</Label>
          <Detail>{item.detail}</Detail>
        </Row>
      ))}
    </Box>
  </Wrapper>
);
