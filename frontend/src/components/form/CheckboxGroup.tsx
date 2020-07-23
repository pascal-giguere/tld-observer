import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  margin-bottom: 12px;
`;

const CheckboxWrapper = styled.div`
  margin: 12px 0;
`;

interface Props {
  children: JSX.Element[];
  label?: string;
}

export const CheckboxGroup = (props: Props) => (
  <React.Fragment>
    {props.label && <Label>{props.label}</Label>}
    {props.children.map((checkbox: JSX.Element, index: number) => (
      <CheckboxWrapper key={index}>{checkbox}</CheckboxWrapper>
    ))}
  </React.Fragment>
);
