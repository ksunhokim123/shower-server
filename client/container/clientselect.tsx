import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Input, Segment, Select, Icon } from 'semantic-ui-react';
import { addSubsribe, fetchClientID  } from '../action/actions';

import Idpw from '../idpw';
import { IdpwModal } from './idpwmodal';
import { State } from '../reducer';


const mapDispatchToProps = (dispatch) => ({
  addSubsribe: (id: string, name: string) => { dispatch(addSubsribe(id, name)); },
  fetchIds: () => { dispatch(fetchClientID()); },
});

const mapStateToProps = (state: State) => ({
  ids: state.client.ids,
});

interface Props {
  ids: string[];
  addSubsribe(id: string, name: string): void;
  fetchIds(): void;
}

interface MyState {
  id: string;
  name: string;
}

class ClientSelectBase extends React.Component<Props, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
    };
  }

  public onSubmit(e) {
    e.preventDefault();
    this.props.addSubsribe(this.state.id, this.state.name);
  }

  public onSelectChange(e, {value}) {
    this.setState({id: value});
  }

  public onInputChange(e) {
    this.setState({name: e.target.value});
  }

  public componentWillMount() {
    setInterval(this.props.fetchIds, 500);
  }

  public render() {
    return (
      <div>
      <Input type='text' placeholder='name' action>
        <Select options={this.props.ids.map((id) => {
          return {key: id, text: id, value: id};
        })}
        value={this.state.id}
        onChange={this.onSelectChange.bind(this)}
        />
        <input
        value={this.state.name}
        onChange={this.onInputChange.bind(this)}
        />
        <Button
        color='twitter'
        icon
        as='div' labelPosition='right'
        onClick={this.onSubmit.bind(this)}>
        Subscribe
        <Icon name='eye'/>
        </Button>
      </Input>
      </div>
    );
  }
}

export const ClientSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientSelectBase);
