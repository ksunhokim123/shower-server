import * as React from 'react';

import { ClientSelect, ClientView } from './container';

export const App: React.StatelessComponent<{}> = (props) => {
  return (
    <div>
        <ClientSelect/>
        <ClientView/>
        <ClientView/>
        <ClientView/>
        <ClientView/>
        <ClientView/>
        <ClientView/>
    </div>
  );
};
