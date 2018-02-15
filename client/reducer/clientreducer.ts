import { ClientAction, DocumentsAction,  IDAction,  TypeKeys  } from '../action/client';
import { ClientMap } from '../model';

export interface ClientState {
  ids: string[];
  documents: ClientMap;
}

const makeEmptyClientState = (): ClientState => ({
  ids: [],
  documents: {},
});

export const ClientReducer = (state: ClientState = makeEmptyClientState()  , action: ClientAction): ClientState => {
  switch (action.type) {
    case TypeKeys.DOCUMENTS :
      return {
        ...state,
        documents: action.documents,
      };
    case TypeKeys.IDS:
      return {
        ...state,
        ids: action.ids,
      };
    default:
        return state;
  }
};
