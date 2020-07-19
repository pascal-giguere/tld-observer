import React from 'react';
import { Global } from '@global/Global';
import { Logo } from '@components/Logo';
import { Box, BoxStyle } from '@components/Box';
import { Separator } from '@components/Separator';
import { Tagline } from '@components/Tagline';
import { VerticalSplit } from '@layouts/VerticalSplit';

const Home = () => (
  <React.Fragment>
    <Global />
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
