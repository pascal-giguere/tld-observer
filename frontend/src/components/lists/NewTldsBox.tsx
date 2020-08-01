import React from 'react';
import { ListBox } from '@components/lists/ListBox';
import { GqlTld } from '@graphql/types';
import { formatDate } from '@utils/formatting';

interface Props {
  tlds: GqlTld[];
}

export const NewTldsBox = (props: Props) => (
  <ListBox title='Latest TLDs'>
    {props.tlds.map((tld: GqlTld) => ({ label: tld.tld, detail: formatDate(tld.launchDate) }))}
  </ListBox>
);
