import React from 'react';
import { Global } from '@global/Global';
import { Logo } from '@components/Logo';
import { Box, BoxStyle } from '@components/Box';
import { Separator } from '@components/Separator';
import { Tagline } from '@components/Tagline';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { Container, MainColumn, SideColumn } from '@styles/index';

const Home = () => (
  <React.Fragment>
    <Global />
    <Container>
      <VerticalSplit
        columns={[
          <MainColumn>
            <Logo />
            <Tagline>New top-level domains, right in your inbox.</Tagline>
            <Box style={BoxStyle.emphasized} title='Sign up for alerts' />
          </MainColumn>,
          <SideColumn>
            <Separator />
            <Box style={BoxStyle.simple} title='Latest TLDs' />
            <Box style={BoxStyle.simple} title='Upcoming TLDs' />
            <Separator />
          </SideColumn>,
        ]}
      />
    </Container>
  </React.Fragment>
);

export default Home;
