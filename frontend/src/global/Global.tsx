import React from 'react';
import { HeaderTags } from '@global/HeaderTags';
import { NoScript } from '@global/NoScript';
import { GlobalStyle } from '@styles/global';

export const Global = () => (
  <React.Fragment>
    <HeaderTags />
    <GlobalStyle />
    <NoScript />
  </React.Fragment>
);
