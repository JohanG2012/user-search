import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import WebFont from 'webfontloader';
import webFontConfig from './configs/webfonts';
import configureStore from './state';
import colors from './constants/colors';
import UsersPage from './views/pages/UsersPage';

/* eslint-disable no-unused-expressions */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${colors.background};
    font-family: Montserrat, sans-serif;
    color: ${colors.textPrimary};
  }
  * {
    box-sizing: border-box;
  }
  #app {
    min-height: 100%
  }
`;
/* eslint-enable no-unused-expressions */

const { store } = configureStore();

WebFont.load(webFontConfig);

render(
  <Fragment>
    <GlobalStyle />
    <Provider store={store}>
      <UsersPage />
    </Provider>
  </Fragment>,
  document.getElementById('app'),
);
