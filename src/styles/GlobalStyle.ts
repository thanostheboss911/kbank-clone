import { css, Global } from '@emotion/react';
import React from 'react';

const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #dbe7f4;
    color: #020616;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul, li {
    list-style: none;
  }

  img, video {
    display: block;
    max-width: 100%;
  }
`;

export const GlobalStyle = () => React.createElement(Global, { styles: globalStyles });
