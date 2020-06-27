import React from 'react';
import styled from 'styled-components';

const Container = styled.h1`
  font-family: 'AT Apoc', serif;
  font-weight: bold;
  font-size: 70px;
`;

interface Props {
  children: string;
}

export const Tagline = (props: Props) => <Container>{props.children}</Container>;
