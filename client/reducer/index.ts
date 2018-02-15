import { combineReducers } from 'redux';

import { ClientMap, Subscribe, SunhoError  } from '../model';
import { ClientReducer, ClientState } from './clientreducer';
import { ErrorReducer } from './errorreducer';

export interface State {
  client: ClientState;
  error: SunhoError;
}

export const state = combineReducers<State>({
  error: ErrorReducer,
  client: ClientReducer,
});
