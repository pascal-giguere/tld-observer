import React from 'react';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet='utf-8' />
        <title>TLD Observer</title>
        <link rel='canonical' href='https://tld.observer/' />
      </Helmet>
      <div>Hello world!</div>
    </React.Fragment>
  );
}
