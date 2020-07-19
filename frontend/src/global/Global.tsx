import React from 'react';
import { HeaderTags } from '@global/HeaderTags';
import { Style } from '@global/Style';
import { NoScript } from '@global/NoScript';

export const Global = () => (
  <React.Fragment>
    <HeaderTags />
    <Style />
    <NoScript />
  </React.Fragment>
);
