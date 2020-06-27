import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

import { VerticalSplit } from '@layouts/VerticalSplit';
import { Logo } from '@components/Logo';
import { Box, BoxStyle } from '@components/Box';
import { Separator } from '@components/Separator';
import { Tagline } from '@components/Tagline';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7ef80;
  }
`;

const Home = () => (
  <React.Fragment>
    <Helmet>
      <meta charSet='utf-8' />
      <title>TLD Observer</title>
      <link rel='canonical' href='https://tld.observer/' />
    </Helmet>
    <GlobalStyle />
    <VerticalSplit
      columns={[
        <React.Fragment>
          <Logo />
          <Tagline>New top-level domains, right in your inbox.</Tagline>
          <Box style={BoxStyle.emphasized} />
        </React.Fragment>,
        <React.Fragment>
          <Separator />
          <Box style={BoxStyle.simple} />
          <Box style={BoxStyle.simple} />
          <Separator />
        </React.Fragment>,
      ]}
    />
  </React.Fragment>
);

export default Home;
