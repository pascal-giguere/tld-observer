import React from 'react';
import styled from 'styled-components';
import { Box, BoxStyle } from '@components/Box';

const Row = styled.div``;

export interface ListItem {
  label: string;
  details: string;
}

interface Props {
  title: string;
  children: ListItem[];
}

export const ListBox = (props: Props) => (
  <Box style={BoxStyle.simple} title={props.title}>
    {props.children.map((item: ListItem) => (
      <Row>{item.label}</Row>
    ))}
  </Box>
);
