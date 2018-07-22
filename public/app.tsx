import * as React from 'react';
import { Provider } from 'react-redux';

import { ClientContainer } from './container';
import { store } from './store';

export const App: React.StatelessComponent<{}> = (props) => {
  return (
    <Provider store={store}>
      <ClientContainer/>
    </Provider>
  );
};
