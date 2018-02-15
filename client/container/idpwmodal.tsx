import * as React from 'react';

import { Segment, Popup, Form, Button, Header, Image, Modal } from 'semantic-ui-react'
import { ClientSelect } from './clientselect';
import Idpw from '../idpw';

interface State {
  open: boolean;
  dimmer: boolean | 'inverted';
  id: string;
  pw: string;
}

export class IdpwModal extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dimmer: false,
      id: '',
      pw: '',
    };
  }

  public show(dimmer2) {
    this.setState({ dimmer: dimmer2, open: true });
  }

  public close() {
    this.setState({ open: false });
  }

  public onIdChnage(e) {
    this.setState({id: e.target.value });
  }

  public onPwChnage(e) {
    this.setState({pw: e.target.value });
  }

  public render() {
    return (
      <Segment>
        <Modal dimmer={this.state.dimmer} open={this.state.open}>
          <Modal.Header>Authentication</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                value={this.state.id}
                onChange={this.onIdChnage.bind(this)}
                label='ID'
                placeholder='ID' />
                <Form.Input
                fluid type='password'
                icon='lock'
                iconPosition='left'
                value={this.state.pw}
                onChange={this.onPwChnage.bind(this)}
                label='PW'
                placeholder='PW' />
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => {this.close()}}>
              Close
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Login" onClick={() => {
              Idpw.id = this.state.id;
              Idpw.pw = this.state.pw;
            }} />
          </Modal.Actions>
        </Modal>
        <Button className='login' circular icon='settings'   onClick={() => {this.show('inverted')}}></Button>
        <ClientSelect/>
      </Segment>
    )
  }
}
