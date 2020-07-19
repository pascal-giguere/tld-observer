import React from 'react';
import { Helmet } from 'react-helmet';
import { Global } from '@global/Global';

const NotFound = () => (
  <React.Fragment>
    <Global />
    <Helmet>
      <title>Page not found — TLD Observer</title>
      <link rel='canonical' href='https://tld.observer/404' />
    </Helmet>
    <h1>Oops</h1>
    <div>The page you're looking for can't be found</div>
  </React.Fragment>
);

export default NotFound;
