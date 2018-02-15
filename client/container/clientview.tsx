import * as React from 'react';

import AceEditor from 'react-ace';
import { Button, Header, Input, Segment, Select } from 'semantic-ui-react';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'articles', text: 'Articles', value: 'articles' },
  { key: 'products', text: 'Products', value: 'products' },
];

export const ClientView: React.StatelessComponent<{}> = (props) => {
  return (
    <div className='clientview'>
    <Header as='h5' attached='top'>
      Dogs
    </Header>
    <Select fluid attached options={options} defaultValue='articles' />
    <Segment attached stacked className='content'>
    <div className='asdf'> </div>
    <AceEditor
      mode='javascript'
      theme='tomorrow'
      readOnly={true}
      highlightActiveLine={false}
      width='auto'
      height='300px'
      className='editor'
      value='export const ClientView: React.StatelessComponent<{}> = (props) => {
        return (
          <Segment>
          export const ClientView: React.StatelessComponent<{}> = (props) => {
            return (
              <Segment>
              export const ClientView: React.StatelessComponent<{}> = (props) => {
                return (
                  <Segment>
                  export const ClientView: React.StatelessComponent<{}> = (props) => {
                    return (
                      <Segment>
                      export const ClientView: React.StatelessComponent<{}> = (props) => {
                        return (
                          <Segment>
                          export const ClientView: React.StatelessComponent<{}> = (props) => {
                            return (
                              <Segment>
                              export const ClientView: React.StatelessComponent<{}> = (props) => {
                                return (
                                  <Segment>
                                  export const ClientView: React.State
                                    return (
                                      <Segment>
                                      export const ClientView: React.StatelessCo
                                        return (
                                          <Segment>
      '
    />
    </Segment>
    </div>
  );
};
