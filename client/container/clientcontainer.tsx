import * as React from 'react';

import { ClientSelect } from './clientselect';
import { ClientView } from './clientview';

export const ClientContainer: React.StatelessComponent<{}> = (props) => {
  return (
    <div>
      <ClientSelect/>
    </div>
  );
};
