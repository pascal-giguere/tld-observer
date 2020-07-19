import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 10px 0;
  border-bottom: 2px solid black;
`;

interface Props {
  children: string;
}

export const Banner = (props: Props) => <Container>{props.children}</Container>;
