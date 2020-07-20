import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 24px;
`;

interface Props {
  id: string;
  label?: string;
}

export const TextField = (props: Props) => (
  <React.Fragment>
    {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
    <Input type='text' id={props.id} />
  </React.Fragment>
);
