import React from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 10px 0;
  background: ${theme.colors.light};
`;

interface Props {
  children: string;
}

export const Banner = (props: Props) => <Container>{props.children}</Container>;
