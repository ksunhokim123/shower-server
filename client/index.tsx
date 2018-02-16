import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';

import 'semantic-ui-css/semantic.min.css';
import './style/index.scss';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
