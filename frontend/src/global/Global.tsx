import React from 'react';
import { GlobalHeaderTags } from '@global/GlobalHeaderTags';
import { GlobalStyle } from '@global/GlobalStyle';

export const Global = () => (
  <React.Fragment>
    <GlobalHeaderTags />
    <GlobalStyle />
    <noscript key='noscript'>
      For the best TLD Observer experience, make sure JavaScript is enabled in your browser settings.
    </noscript>
  </React.Fragment>
);
