import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { theme } from '@styles/theme';

const Label = styled.label`
  display: inline-block;
  font-style: normal;
  padding-left: 15px;
`;

interface Props {
  id: string;
  label: string;
  compactLabel?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = (props: Props) => {
  const windowWidth: number = useWindowWidth();
  const isPhoneWidth: boolean = windowWidth <= theme.breakpoints.phone.max;
  const label: string = props.compactLabel && isPhoneWidth ? props.compactLabel : props.label;

  return (
    <React.Fragment>
      <input
        type='checkbox'
        id={props.id}
        checked={props.checked}
        disabled={props.disabled}
        onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.checked)}
      />
      <Label htmlFor={props.id}>{label}</Label>
    </React.Fragment>
  );
};
