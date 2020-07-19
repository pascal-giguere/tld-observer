import React from 'react';
import { GlobalHeaderTags } from '@global/GlobalHeaderTags';
import { GlobalStyle } from '@global/GlobalStyle';

export const Global = () => (
  <React.Fragment>
    <GlobalHeaderTags />
    <GlobalStyle />
    <noscript key='noscript'>
      Using TLD Observer requires JavaScript. Make sure it's enabled in your browser settings.
    </noscript>
  </React.Fragment>
);
