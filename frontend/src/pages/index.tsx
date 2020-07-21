import React from 'react';
import { Global } from '@global/Global';
import { Logo } from '@components/Logo';
import { SignUpBoxContainer } from '@components/signUp/SignUpBoxContainer';
import { Separator } from '@components/Separator';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { Container, MainColumn, SideColumn, Tagline } from '@styles/index';
import { NewTldsBox } from '@components/lists/NewTldsBox';
import { UpcomingTldsBox } from '@components/lists/UpcomingTldsBox';

const Home = () => (
  <React.Fragment>
    <Global />
    <Container>
      <VerticalSplit>
        <MainColumn>
          <Logo />
          <Tagline>New top-level domains, right in your inbox.</Tagline>
          <SignUpBoxContainer />
        </MainColumn>
        <SideColumn>
          <Separator />
          <NewTldsBox />
          <UpcomingTldsBox />
          <Separator />
        </SideColumn>
      </VerticalSplit>
    </Container>
  </React.Fragment>
);

export default Home;
