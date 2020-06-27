import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import { VerticalSplit } from '../layout/VerticalSplit';

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
    <VerticalSplit columns={[<React.Fragment>Hello</React.Fragment>, <React.Fragment>World</React.Fragment>]} />
  </React.Fragment>
);

export default Home;
