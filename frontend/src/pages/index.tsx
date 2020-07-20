import React from 'react';
import { Global } from '@global/Global';
import { Logo } from '@components/Logo';
import { SignUpBox } from '@components/signUp/SignUpBox';
import { Box, BoxStyle } from '@components/Box';
import { Separator } from '@components/Separator';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { Container, MainColumn, SideColumn, Tagline } from '@styles/index';

const Home = () => (
  <React.Fragment>
    <Global />
    <Container>
      <VerticalSplit>
        <MainColumn>
          <Logo />
          <Tagline>New top-level domains, right in your inbox.</Tagline>
          <SignUpBox />
        </MainColumn>
        <SideColumn>
          <Separator />
          <Box style={BoxStyle.simple} title='Latest TLDs'>
            <div>b</div>
          </Box>
          <Box style={BoxStyle.simple} title='Upcoming TLDs'>
            <div>c</div>
          </Box>
          <Separator />
        </SideColumn>
      </VerticalSplit>
    </Container>
  </React.Fragment>
);

export default Home;
