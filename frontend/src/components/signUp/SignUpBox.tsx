import React from 'react';
import styled from 'styled-components';
import { Box, BoxStyle } from '@components/Box';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { TextField } from '@components/form/TextField';
import { CheckboxGroup } from '@components/form/CheckboxGroup';
import { Checkbox } from '@components/form/Checkbox';

const Row = styled.div`
  margin: 10px 0;
`;

export const SignUpBox = () => (
  <Box style={BoxStyle.emphasized} title='Sign up for alerts'>
    <Row>
      <VerticalSplit spacingPx={13}>
        <TextField id='name' label='Your name' />
        <TextField id='email' label='Your email' />
      </VerticalSplit>
    </Row>
    <Row>
      <CheckboxGroup label='Get alerts for'>
        <Checkbox id='newTldAlerts' label='New top-level domains' />
        <Checkbox id='upcomingTldAlerts' label='Upcoming top-level domains' />
      </CheckboxGroup>
    </Row>
  </Box>
);
