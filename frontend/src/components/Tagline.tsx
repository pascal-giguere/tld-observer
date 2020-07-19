import React from 'react';
import styled from 'styled-components';

const Container = styled.h1`
  font-size: 70px;
  margin: 110px 0;
`;

interface Props {
  children: string;
}

export const Tagline = (props: Props) => <Container>{props.children}</Container>;
