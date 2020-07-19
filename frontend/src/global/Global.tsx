import React from 'react';
import { GlobalHeaderTags } from '@global/GlobalHeaderTags';
import { GlobalStyle } from '@global/GlobalStyle';

export const Global = () => (
  <React.Fragment>
    <GlobalHeaderTags />
    <GlobalStyle />
    <noscript>TLD Observer requires JavaScript to run. Make sure JavaScript enabled in your browser settings.</noscript>
  </React.Fragment>
);
