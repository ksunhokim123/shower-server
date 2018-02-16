import * as React from 'react';
import { connect } from 'react-redux';

import AceEditor from 'react-ace';
import { Button, Container,  Header, Input, Segment, Select } from 'semantic-ui-react';
import { removeClient, removeSubscribe  } from '../action/actions';

import { Document } from '../model';

import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

interface Props {
  id: string;
  name: string;
  documents: Document[];
  removeSubsribe(id: string): void;
}

interface MyState {
  seltitle: string;
}

const mapDispatchToProps = (dispatch) => ({
  removeSubsribe: (id: string) => {
    dispatch(removeSubscribe(id));
    dispatch(removeClient(id));
  },
});

class ClientViewBase extends React.Component<Props, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      seltitle: '',
    };
  }

public onSelectChange(e, { value }) {
  this.setState({
    seltitle: value,
  });
}

  public getCurrentDocument(): { exist: boolean, type?: string, current?: Document } {
    for (const doc of this.props.documents) {
      if (this.state.seltitle === doc.title) {
        let typ = '';
        if (doc.title.endsWith('.html')) {
          typ = 'html';
        }
        if (doc.title.endsWith('.css')) {
          typ = 'css';
        }
        if (doc.title.endsWith('.js')) {
          typ = 'javascript';
        }
        return { exist: true, type: typ, current: doc };
      }
    }
    return {exist: false};
}

  public render() {
    const result = this.getCurrentDocument();
    return (
        <div className='clientview'>
          <Header as='div' attached='top' className='title'>
            <span>{this.props.name}</span>
            <span><Button className='unsubbutton' onClick={() => {this.props.removeSubsribe(this.props.id); }}>remove</Button></span>
          </Header>
          <Select
          fluid
          options={this.props.documents.map((document) => {
            return {key: document.title, text: document.title, value: document.title};
          })}
          value={this.state.seltitle}
          onChange={this.onSelectChange.bind(this)}
           />
           {
             result.exist ?
             <Segment attached stacked className='content'>
               <div className='asdf'> </div>
               <AceEditor
                 mode={result.type ? result.type : ''}
                 theme='tomorrow'
                 readOnly={true}
                 highlightActiveLine={false}
                 width='auto'
                 height='300px'
                 className='editor'
                 value={result.current ? result.current.content : '' }
               />
           </Segment>
           : null
           }

        </div>
      );
  }
}
export const ClientView = connect(
  null,
  mapDispatchToProps,
)(ClientViewBase);
