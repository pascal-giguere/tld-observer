import React from 'react';
import styled from 'styled-components';
import { Box, BoxStyle } from '@components/Box';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { TextField } from '@components/form/TextField';
import { CheckboxGroup } from '@components/form/CheckboxGroup';
import { Checkbox } from '@components/form/Checkbox';
import { Button } from '@components/form/Button';
import { InputId, SignUpData } from '@components/signUp/SignUpBoxContainer';

const Row = styled.div`
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

interface Props {
  data: SignUpData;
  onInputValueChange: (inputId: InputId, value: unknown) => void;
  onSubmit: () => void;
}

export const SignUpBox = (props: Props) => {
  const { name, email, newTldAlerts, upcomingTldAlerts } = props.data;
  return (
    <Box style={BoxStyle.emphasized} title='Sign up for alerts'>
      <Row>
        <VerticalSplit spacingPx={13}>
          <TextField
            id={InputId.name}
            label='Your name'
            value={name}
            onChange={(value: string) => props.onInputValueChange(InputId.name, value)}
          />
          <TextField
            id={InputId.email}
            label='Your email'
            value={email}
            onChange={(value: string) => props.onInputValueChange(InputId.email, value)}
          />
        </VerticalSplit>
      </Row>
      <Row>
        <CheckboxGroup label='Get alerts for'>
          <Checkbox
            id={InputId.newTldAlerts}
            label='New top-level domains'
            checked={newTldAlerts}
            onChange={(checked: boolean) => props.onInputValueChange(InputId.newTldAlerts, checked)}
          />
          <Checkbox
            id={InputId.upcomingTldAlerts}
            label='Upcoming top-level domains'
            checked={upcomingTldAlerts}
            onChange={(checked: boolean) => props.onInputValueChange(InputId.upcomingTldAlerts, checked)}
          />
        </CheckboxGroup>
      </Row>
      <ButtonWrapper>
        <Button onClick={props.onSubmit}>I'm in</Button>
      </ButtonWrapper>
    </Box>
  );
};
