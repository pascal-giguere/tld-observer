import styled from 'styled-components';
import { Pattern } from '@components/Pattern';

export const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;
`;

const Column = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const MainColumn = styled(Column)`
  max-width: 800px;
`;

export const SideColumn = styled(Column)`
  max-width: 480px;
  position: absolute;
  right: 0;
`;

export const Tagline = styled.h1`
  font-size: 70px;
  margin: 110px 0 140px 0;
`;

const Separator = styled(Pattern)`
  margin: 90px 0;
`;

export const TopSeparator = styled(Separator)`
  margin-top: 0;
  height: 120px;
`;

export const BottomSeparator = styled(Separator)`
  height: 28px;
`;

export const Footer = styled.div`
  margin-top: -15px;
  text-align: right;
  font-style: italic;
  font-size: 16px;
  line-height: 26px;

  & span {
    font-style: normal;
    font-family: sans-serif;
  }

  & a {
    display: block;
    text-transform: lowercase;
    text-decoration: underline;
  }
`;
