import React from 'react';
import { Helmet } from 'react-helmet';
import { theme } from '@styles/theme';

import favicon32 from '@images/favicons/favicon32.png';
import favicon128 from '@images/favicons/favicon128.png';
import favicon192 from '@images/favicons/favicon192.png';
import favicon152 from '@images/favicons/favicon152.png';
import favicon167 from '@images/favicons/favicon167.png';
import favicon180 from '@images/favicons/favicon180.png';
import favicon196 from '@images/favicons/favicon196.png';

export const HeaderTags = () => (
  <Helmet>
    <html lang='en' />
    <meta charSet='utf-8' />
    <title>TLD Observer</title>
    <meta name='description' content='New top-level domains, right in your inbox.' />
    <meta name='theme-color' content={theme.colors.primary} />
    <meta property='og:title' content='TLD Observer' />
    <meta property='og:url' content='https://tld.observer' />
    <meta property='og:image' content='https://tld.observer/images/og-image.png' />
    <meta property='og:type' content='website' />
    <meta property='og:description' content='New top-level domains, right in your inbox.' />
    <link rel='canonical' href='https://tld.observer/' />
    <link rel='icon' href={favicon32} sizes='32x32' />
    <link rel='icon' href={favicon128} sizes='128x128' />
    <link rel='icon' href={favicon192} sizes='192x192' />
    <link rel='apple-touch-icon' href={favicon152} sizes='152x152' />
    <link rel='apple-touch-icon' href={favicon167} sizes='167x167' />
    <link rel='apple-touch-icon' href={favicon180} sizes='180x180' />
    <link rel='shortcut icon' href={favicon196} sizes='196x196' />
    <link rel='manifest' href='/manifest.webmanifest' />
  </Helmet>
);
