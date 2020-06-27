import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import { VerticalSplit } from '../layout/VerticalSplit';
import { Logo } from '../components/Logo';
import { Box } from '../components/Box';

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
          <Box style={'white'} />
        </React.Fragment>,
        <React.Fragment>
          <Box style={'yellow'} />
          <Box style={'yellow'} />
        </React.Fragment>,
      ]}
    />
  </React.Fragment>
);

export default Home;
