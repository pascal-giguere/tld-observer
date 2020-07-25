import React from 'react';
import { ListBox } from '@components/lists/ListBox';

export const NewTldsBox = () => (
  <ListBox title='Latest TLDs'>
    {[
      { label: '.cyou', detail: 'june 23 2020' },
      { label: '.dealer', detail: 'june 8 2020' },
      { label: '.meet', detail: 'may 25 2020' },
    ]}
  </ListBox>
);
