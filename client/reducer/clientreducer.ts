import { ClientAction, DocumentsAction,  IDAction,  TypeKeys  } from '../action/client';
import { Client } from '../model';

export interface ClientState {
  ids: string[];
  clients: Client[];
}

const makeEmptyClientState = (): ClientState => ({
  ids: [],
  clients: [],
});

export const ClientReducer = (state: ClientState = makeEmptyClientState()  , action: ClientAction): ClientState => {
  switch (action.type) {
    case TypeKeys.DOCUMENTS :
      for (let i : number = 0; i < state.clients.length; i ++) {
        if (state.clients[i].id === action.id) {
          let arr: Client[] = [...state.clients];
          arr[i] = {id: action.id, name: action.name, documents: action.documents };
          return Object.assign({}, state, {
            clients: arr,
          });
        }
       }
       state.clients = state.clients.concat({ documents: action.documents, id: action.id, name: action.name });
      return state;
    case TypeKeys.IDS:
      return {
        ...state,
        ids: action.ids,
      };
    default:
        return state;
  }
};
