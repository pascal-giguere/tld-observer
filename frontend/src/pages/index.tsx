import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7ef80;
  }
`;

export default function Home() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet='utf-8' />
        <title>TLD Observer</title>
        <link rel='canonical' href='https://tld.observer/' />
      </Helmet>
      <GlobalStyle />
      <div>Hello world!</div>
    </React.Fragment>
  );
}
