import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

interface Props {
  children: string;
}

export const Banner = (props: Props) => <Container>{props.children}</Container>;
