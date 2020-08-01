import styled from 'styled-components';
import { Pattern } from '@components/Pattern';
import { theme } from '@styles/theme';

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const Column = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const MainColumn = styled(Column)`
  max-width: 720px;

  @media only screen and (max-width: ${theme.breakpoints.tablet.max}px) {
    position: static;
    margin: auto;
  }
`;

export const SideColumn = styled(Column)`
  max-width: 350px;
  position: absolute;
  right: 0;

  @media only screen and (max-width: ${theme.breakpoints.tablet.max}px) {
    position: static;
    margin: auto;
  }
`;

export const Tagline = styled.h1`
  font-size: 55px;
  margin: 90px 0 120px 0;

  @media only screen and (max-width: ${theme.breakpoints.phone.max}px) {
    text-align: center;
    font-size: 36px;
    padding: 0 20px;
    margin: 60px 0 70px;
  }
`;

const Separator = styled(Pattern)`
  margin: 90px 0;
`;

export const TopSeparator = styled(Separator)`
  height: 120px;
  margin-top: 0;

  @media only screen and (max-width: ${theme.breakpoints.tablet.max}px) {
    margin-top: 105px;
    height: 28px;
  }
`;

export const BottomSeparator = styled(Separator)`
  height: 28px;
`;

export const Footer = styled.div`
  margin: -15px 0 70px;
  text-align: right;
  font-style: italic;
  font-size: 16px;
  line-height: 26px;

  & span {
    font-style: normal;
    font-family: sans-serif;
  }

  & a {
    display: inline-block;
    text-transform: lowercase;
  }

  @media only screen and (max-width: ${theme.breakpoints.tablet.max}px) {
    text-align: center;
    margin-bottom: 50px;

    & a {
      padding: 5px 0;
    }
  }
`;
