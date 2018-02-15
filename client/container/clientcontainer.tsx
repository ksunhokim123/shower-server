import * as React from 'react';

import { IdpwModal } from './idpwmodal';
import { ClientViewContainer } from './clientviewcontainer';

export const ClientContainer: React.StatelessComponent<{}> = (props) => {
  return (
    <div>
      <IdpwModal/>
      <ClientViewContainer/>
    </div>
  );
};
