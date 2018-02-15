import { combineReducers } from 'redux';

import {  Subscribe, SunhoError  } from '../model';
import { ClientReducer, ClientState } from './clientreducer';
import { ErrorReducer } from './errorreducer';
import { SubscribeReducer } from './subscribereducer';

export interface State {
  client: ClientState;
  error: SunhoError;
  subscribes: Subscribe[];
}

export const state = combineReducers<State>({
  error: ErrorReducer,
  client: ClientReducer,
  subscribes: SubscribeReducer,
});
