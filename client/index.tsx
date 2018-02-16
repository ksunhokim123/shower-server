import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';

import 'semantic-ui-css/semantic.min.css';
import './style/index.scss';

let newDiv = document.createElement('div');
newDiv.id = 'root';
document.body.appendChild(newDiv);
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
