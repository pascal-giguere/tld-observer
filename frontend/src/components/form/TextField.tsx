import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 24px;
`;

export enum TextType {
  text = 'text',
  email = 'email',
  search = 'search',
}

interface Props {
  id: string;
  type?: TextType;
  label?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const TextField = (props: Props) => (
  <React.Fragment>
    {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
    <Input
      type={props.type ?? TextType.text}
      id={props.id}
      value={props.value}
      disabled={props.disabled}
      onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
    />
  </React.Fragment>
);
