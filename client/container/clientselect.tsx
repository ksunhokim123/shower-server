import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Input, Segment, Select } from 'semantic-ui-react';
import { fetchClientID  } from '../action/fetch';
import { State } from '../reducer';

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'articles', text: 'Articles', value: 'articles' },
  { key: 'products', text: 'Products', value: 'products' },
];

const mapDispatchToProps = (dispatch) => ({
  fetchIds: () => { dispatch(fetchClientID()); },
});

const mapStateToProps = (state: State) => ({
  ids: state.client.ids,
});

interface Props {
  ids: string[];
  fetchIds(): void;
}

interface SelectState {
  id: string;
  name: string;
}

class ClientSelectBase extends React.Component<Props, SelectState> {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
    };
  }

  public onSelectChange(e) {
    this.setState({id: e.target.value});
  }

  public onInputChange(e) {
    this.setState({name: e.target.value});
  }

  public componentWillMount() {
    setInterval(this.props.fetchIds, 500);
  }

  public render() {
    return (
      <Segment>
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
        <Button type='submit'>subscribe</Button>
      </Input>
      </Segment>
    );
  }
}
/*

()*/
export const ClientSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientSelectBase);
