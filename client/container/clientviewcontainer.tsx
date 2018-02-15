import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Input, Segment, Select } from 'semantic-ui-react';

import { fetchSubscribes } from '../action/actions';
import { Client, Subscribe } from '../model';
import { State } from '../reducer';
import { ClientView } from './clientview';

const mapDispatchToProps = (dispatch) => ({
  fetchSubscribes: (subs: Subscribe[]) => { dispatch( fetchSubscribes(subs) ); },
});

const mapStateToProps = (state: State) => ({
  clients: state.client.clients,
  subscribes: state.subscribes,
});

interface Props {
  clients: Client[];
  subscribes: Subscribe[];
  fetchSubscribes(subs: Subscribe[]): void;
}

// TODO optimize rendering
class ClientViewContainerBase extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    setInterval(() => {this.props.fetchSubscribes(this.props.subscribes); }, 500);
  }

  public render() {
    return (
      <div>
        {this.props.clients.map((cli) => {
            return (
              <ClientView
              documents = {cli.documents}
              name = {cli.name}
              id = {cli.id}
              />
            );
          })}
        </div>
    );
  }
}

export const ClientViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientViewContainerBase);
