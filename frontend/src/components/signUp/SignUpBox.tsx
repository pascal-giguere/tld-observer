import React from 'react';
import styled from 'styled-components';
import { theme } from '@styles/theme';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { Box, BoxStyle } from '@components/Box';
import { TextField } from '@components/form/TextField';
import { CheckboxGroup } from '@components/form/CheckboxGroup';
import { Checkbox } from '@components/form/Checkbox';
import { Button } from '@components/form/Button';
import { InputId, SignUpData } from '@components/signUp/SignUpBoxContainer';

const Row = styled.div`
  margin: 10px 0;
`;

const ErrorMessage = styled.div`
  margin: 35px 0;
  text-align: center;
  color: ${theme.colors.error};
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

interface Props {
  data: SignUpData;
  errorMessage: string | null;
  onInputValueChange: (inputId: InputId, value: unknown) => void;
  onSubmit: () => void;
}

export const SignUpBox = (props: Props) => {
  const { data, errorMessage, onInputValueChange, onSubmit } = props;
  const { name, email, newTldAlerts, upcomingTldAlerts } = data;
  return (
    <Box style={BoxStyle.emphasized} title='Sign up for alerts'>
      <Row>
        <VerticalSplit spacingPx={13}>
          <TextField
            id={InputId.name}
            label='Your name'
            value={name}
            onChange={(value: string) => onInputValueChange(InputId.name, value)}
          />
          <TextField
            id={InputId.email}
            label='Your email'
            value={email}
            onChange={(value: string) => onInputValueChange(InputId.email, value)}
          />
        </VerticalSplit>
      </Row>
      <Row>
        <CheckboxGroup label='Get alerts for'>
          <Checkbox
            id={InputId.newTldAlerts}
            label='New top-level domains'
            checked={newTldAlerts}
            onChange={(checked: boolean) => onInputValueChange(InputId.newTldAlerts, checked)}
          />
          <Checkbox
            id={InputId.upcomingTldAlerts}
            label='Upcoming top-level domains'
            checked={upcomingTldAlerts}
            onChange={(checked: boolean) => onInputValueChange(InputId.upcomingTldAlerts, checked)}
          />
        </CheckboxGroup>
      </Row>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <React.Fragment />}
      <ButtonWrapper>
        <Button onClick={onSubmit}>I'm in</Button>
      </ButtonWrapper>
    </Box>
  );
};
