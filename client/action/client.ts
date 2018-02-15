import { ClientMap } from '../model';

export enum TypeKeys {
  DOCUMENTS = 'client_document_success',
  IDS = 'clients_ids_success',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface DocumentsAction {
  type: TypeKeys.DOCUMENTS;
  documents: ClientMap;
}

export interface IDAction {
  type: TypeKeys.IDS;
  ids: string[];
}

export interface OtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type ClientAction =
   | DocumentsAction
   | IDAction
   | OtherAction;
