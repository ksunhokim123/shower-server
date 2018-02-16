import * as React from 'react';

import { ClientViewContainer } from './clientviewcontainer';
import { IdpwModal } from './idpwmodal';


export const ClientContainer: React.StatelessComponent<{}> = (props) => {
  return (
    <div>
      <IdpwModal/>
      <ClientViewContainer/>
    </div>
  );
};
