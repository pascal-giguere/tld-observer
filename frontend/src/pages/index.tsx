import React from 'react';
import { Helmet } from 'react-helmet';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { GlobalStyle } from '@components/GlobalStyle';
import { Logo } from '@components/Logo';
import { Box, BoxStyle } from '@components/Box';
import { Separator } from '@components/Separator';
import { Tagline } from '@components/Tagline';

import favicon32 from '@images/favicons/favicon32.png';
import favicon128 from '@images/favicons/favicon128.png';
import favicon192 from '@images/favicons/favicon192.png';
import favicon152 from '@images/favicons/favicon152.png';
import favicon167 from '@images/favicons/favicon167.png';
import favicon180 from '@images/favicons/favicon180.png';

const Home = () => (
  <React.Fragment>
    <Helmet>
      <meta charSet='utf-8' />
      <title>TLD Observer</title>
      <meta name='description' content='New top-level domains, right in your inbox.' />
      <link rel='canonical' href='https://tld.observer/' />
      <link rel='icon' href={favicon32} sizes='32x32' />
      <link rel='icon' href={favicon128} sizes='128x128' />
      <link rel='icon' href={favicon192} sizes='192x192' />
      <link rel='apple-touch-icon' href={favicon152} sizes='152x152' />
      <link rel='apple-touch-icon' href={favicon167} sizes='167x167' />
      <link rel='apple-touch-icon' href={favicon180} sizes='180x180' />
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
