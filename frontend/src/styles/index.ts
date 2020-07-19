import styled from 'styled-components';

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
  margin: 110px 0;
`;
