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
  margin-bottom: 10px;
`;

const InfoMessage = styled.div`
  margin: 35px auto;
  max-width: 400px;
  text-align: center;
  line-height: 24px;
`;

const ErrorMessage = styled(InfoMessage)`
  color: ${theme.colors.error};
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

interface Props {
  data: SignUpData;
  infoMessage: string | null;
  errorMessage: string | null;
  isLoading: boolean;
  didSubmit: boolean;
  onInputValueChange: (inputId: InputId, value: unknown) => void;
  onSubmit: () => void;
}

export const SignUpBox = (props: Props) => {
  const { data, infoMessage, errorMessage, isLoading, didSubmit, onInputValueChange, onSubmit } = props;
  const { name, email, newTldAlerts, upcomingTldAlerts } = data;
  return (
    <Box style={BoxStyle.emphasized} title='Sign up for alerts' disabled={isLoading}>
      <Row>
        <VerticalSplit spacingPx={13} breakpointPx={theme.breakpoints.phone.max}>
          <TextField
            id={InputId.name}
            label='Your name'
            value={name}
            disabled={didSubmit}
            onChange={(value: string) => onInputValueChange(InputId.name, value)}
          />
          <TextField
            id={InputId.email}
            label='Your email'
            value={email}
            disabled={didSubmit}
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
            disabled={didSubmit}
            onChange={(checked: boolean) => onInputValueChange(InputId.newTldAlerts, checked)}
          />
          <Checkbox
            id={InputId.upcomingTldAlerts}
            label='Upcoming top-level domains'
            checked={upcomingTldAlerts}
            disabled={didSubmit}
            onChange={(checked: boolean) => onInputValueChange(InputId.upcomingTldAlerts, checked)}
          />
        </CheckboxGroup>
      </Row>
      {infoMessage ? <InfoMessage>{infoMessage}</InfoMessage> : <React.Fragment />}
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <React.Fragment />}
      <ButtonWrapper>
        <Button onClick={onSubmit} disabled={didSubmit}>
          {didSubmit ? "You're in" : "I'm in"}
        </Button>
      </ButtonWrapper>
    </Box>
  );
};
