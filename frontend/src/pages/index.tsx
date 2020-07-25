import React from 'react';
import { theme } from '@styles/theme';
import { Global } from '@global/Global';
import { Logo } from '@components/Logo';
import { SignUpBoxContainer } from '@components/signUp/SignUpBoxContainer';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { Container, MainColumn, SideColumn, Tagline, TopSeparator, BottomSeparator, Footer } from '@styles/index';
import { NewTldsBox } from '@components/lists/NewTldsBox';
import { UpcomingTldsBox } from '@components/lists/UpcomingTldsBox';

const Home = () => (
  <React.Fragment>
    <Global />
    <Container>
      <VerticalSplit breakpointPx={theme.breakpoints.tablet.max}>
        <MainColumn>
          <Logo />
          <Tagline>New top-level domains, right in your inbox.</Tagline>
          <SignUpBoxContainer />
        </MainColumn>
        <SideColumn>
          <TopSeparator />
          <div>
            <NewTldsBox />
            <UpcomingTldsBox />
          </div>
          <BottomSeparator />
          <Footer>
            <span>©</span> TLD Observer 2020
            <div>
              <a href='https://github.com/pascal-giguere/tld-observer'>Source on GitHub</a>
            </div>
            <div>
              <a href='mailto:tldobserver@pascalgiguere.dev'>Support & feedback</a>
            </div>
          </Footer>
        </SideColumn>
      </VerticalSplit>
    </Container>
  </React.Fragment>
);

export default Home;
