import * as React from 'react';
import Clipboard from 'react-clipboard.js';
import { connect } from 'react-redux';

import { Button, Container,  Header, Input, Segment, Select } from 'semantic-ui-react';
import { removeClient, removeSubscribe  } from '../action/actions';

import { Document } from '../model';

import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { coy } from 'react-syntax-highlighter/styles/prism';

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
            <span className='name'>{this.props.name}</span>
            <span><Clipboard className='ui button unsubbutton'
            data-clipboard-text={result.current ? result.current.content : '' }>copy</Clipboard></span>
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
               <div className='editor'>
                 <SyntaxHighlighter language={result.type ? result.type : ''} style={coy}>
                 {result.current ? result.current.content : '' }
                 </SyntaxHighlighter>
               </div>
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
