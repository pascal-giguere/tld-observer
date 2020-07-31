import React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { UnsubscribeContainer } from '@components/unsubscribe/UnsubscribeContainer';
import { Global } from '@global/Global';
import { Helmet } from 'react-helmet';

const Unsubscribe = () => {
  const [memberId] = useQueryParam('id', StringParam);

  return (
    <React.Fragment>
      <Global />
      <Helmet>
        <title>Unsubscribe — TLD Observer</title>
        <link rel='canonical' href='https://tld.observer/unsubscribe' />
      </Helmet>
      <UnsubscribeContainer memberId={memberId ?? undefined} />
    </React.Fragment>
  );
};

export default Unsubscribe;
