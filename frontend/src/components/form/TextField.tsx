import React, { ChangeEvent } from 'react';
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
  value: string;
  onChange: (value: string) => void;
}

export const TextField = (props: Props) => (
  <React.Fragment>
    {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
    <Input
      type='text'
      id={props.id}
      value={props.value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
    />
  </React.Fragment>
);
