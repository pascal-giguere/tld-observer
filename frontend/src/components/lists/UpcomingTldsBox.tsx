import React from 'react';
import { ListBox } from '@components/lists/ListBox';

export const UpcomingTldsBox = () => (
  <ListBox title='Upcoming TLDs'>
    {[
      { label: '.new', detail: 'july 21 2020' },
      { label: '.basketball', detail: 'october 12 2020' },
      { label: '.cpa', detail: 'TBD' },
    ]}
  </ListBox>
);
