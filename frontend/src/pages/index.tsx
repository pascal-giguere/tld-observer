import React from 'react';
import { graphql } from 'gatsby';
import { theme } from '@styles/theme';
import { Global } from '@global/Global';
import { VerticalSplit } from '@layouts/VerticalSplit';
import { Logo } from '@components/logo/Logo';
import { SignUpBoxContainer } from '@components/signUp/SignUpBoxContainer';
import { NewTldsBox } from '@components/lists/NewTldsBox';
import { UpcomingTldsBox } from '@components/lists/UpcomingTldsBox';
import { Container, MainColumn, SideColumn, Tagline, TopSeparator, BottomSeparator, Footer } from '@styles/index';
import { GqlTldsQueryData } from '@graphql/types';

const Home = ({ data }: { data: GqlTldsQueryData }) => (
  <React.Fragment>
    <Global />
    <Container>
      <VerticalSplit breakpointPx={theme.breakpoints.desktop.min - 20} spacingPx={10}>
        <MainColumn>
          <Logo />
          <Tagline>New top-level domains, right in your inbox.</Tagline>
          <SignUpBoxContainer />
        </MainColumn>
        <SideColumn>
          <TopSeparator id='top' />
          <div>
            <NewTldsBox tlds={data.allLatestTlds.nodes} />
            <UpcomingTldsBox tlds={data.allUpcomingTlds.nodes} />
          </div>
          <BottomSeparator id='bottom' />
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

export const query = graphql`
  query {
    allLatestTlds(limit: 3, filter: { launchDateConfirmed: { eq: true } }) {
      nodes {
        tld
        launchDate
        launchDateConfirmed
      }
    }
    allUpcomingTlds(limit: 3) {
      nodes {
        tld
        launchDate
        launchDateConfirmed
      }
    }
  }
`;
