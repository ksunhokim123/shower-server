import { Document } from '../model';

export enum TypeKeys {
  DOCUMENTS = 'client_document_success',
  IDS = 'clients_ids_success',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface DocumentsAction {
  type: TypeKeys.DOCUMENTS;
  id: string;
  name: string;
  documents: Document[];
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
