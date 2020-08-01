import React from 'react';
import { ListBox } from '@components/lists/ListBox';
import { GqlTld } from '@graphql/types';
import { formatDate } from '@utils/formatting';

interface Props {
  tlds: GqlTld[];
}

export const UpcomingTldsBox = (props: Props) => (
  <ListBox title='Upcoming TLDs'>
    {props.tlds.map((tld: GqlTld) => ({
      label: tld.tld,
      detail: tld.launchDateConfirmed ? formatDate(tld.launchDate) : 'TBD',
    }))}
  </ListBox>
);
