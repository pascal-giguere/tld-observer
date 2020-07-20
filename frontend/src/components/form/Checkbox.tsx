import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  font-style: normal;
  padding-left: 15px;
`;

const Input = styled.input``;

interface Props {
  id: string;
  label: string;
}

export const Checkbox = (props: Props) => (
  <React.Fragment>
    <Input type='checkbox' id={props.id} />
    <Label htmlFor={props.id}>{props.label}</Label>
  </React.Fragment>
);
