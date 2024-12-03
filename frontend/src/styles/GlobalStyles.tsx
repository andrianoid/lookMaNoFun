import { Global, css } from '@emotion/react';
import React from 'react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  button {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export const GlobalStyles: React.FC = () => (
  <Global styles={globalStyles} />
);

export default GlobalStyles; 