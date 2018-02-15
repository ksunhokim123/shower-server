import * as React from 'react';

import { Button, Input, Segment, Select } from 'semantic-ui-react';

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'articles', text: 'Articles', value: 'articles' },
  { key: 'products', text: 'Products', value: 'products' },
];

export const ClientSelect: React.StatelessComponent<{}> = (props) => {
  return (
    <Segment>
    <Input type='text' placeholder='Search...' action>
      <Select options={options} defaultValue='articles' />
      <input />
      <Button type='submit'>Search</Button>
    </Input>
    </Segment>
  );
};
