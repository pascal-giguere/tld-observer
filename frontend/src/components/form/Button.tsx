import styled from 'styled-components';
import React from 'react';

const StyledButton = styled.button`
  min-width: 130px;
`;

interface Props {
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = (props: Props) => (
  <StyledButton disabled={props.disabled} onClick={props.onClick}>
    {props.children}
  </StyledButton>
);
