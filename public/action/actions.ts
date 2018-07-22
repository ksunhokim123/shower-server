// TODO make api action call
import { Base64 } from 'js-base64';
import { DocumentsAction, IDAction, RemoveAction as ClientRemoveAction, TypeKeys as ClientTypeKeys  } from './client';
import { AddAction, RemoveAction as SubscribeRemoveAction, TypeKeys as SubscribeTypeKeys } from './subscribe';

import Idpw from '../idpw';
import { Document, Subscribe } from '../model';

const apiDocuments = (id: string): Promise<string[]> => {
  return fetch('api/clients/' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + Base64.encode(Idpw.id + ':' + Idpw.pw),
        },
       })
    .then((response) => (response.json()));
};

export const fetchSubscribes = (subs: Subscribe[]) => (dispatch) => {
  for (const sub of subs) {
    dispatch(fetchDocuments(sub.id, sub.name));
  }
};

export const fetchDocuments = (id: string, name: string) => (dispatch) => {
  apiDocuments(id)
  .then((data: object) => {
    const documents: Document[] = [];
    for (const key of Object.keys(data)) {
      documents.push({
        title: key,
        content: data[key],
      });
    }
    dispatch(fetchDocumentsComplete(id, name, documents));
  });
};

const apiClientID = (): Promise<string[]> => {
  return fetch('api/clients', {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + Base64.encode(Idpw.id + ':' + Idpw.pw),
        },
       })
    .then((response) => (response.json()));
};

export const fetchClientID = () => (dispatch) => {
  apiClientID()
  .then((ids) => {
    dispatch(fetchIDsComplete(ids));
  });
};

const fetchIDsComplete = (ids: string[]): IDAction => ({
  type: ClientTypeKeys.IDS,
  ids,
});

const fetchDocumentsComplete = (id: string, name: string, documents: Document[]): DocumentsAction => ({
  type: ClientTypeKeys.DOCUMENTS,
  id,
  name,
  documents,
});

export const addSubscribe = (id: string, name: string): AddAction => ({
  type: SubscribeTypeKeys.ADD,
  id,
  name,
});

export const removeSubscribe = (id2: string): SubscribeRemoveAction => ({
  type: SubscribeTypeKeys.REMOVE,
  id: id2,
});

export const removeClient = (id2: string): ClientRemoveAction => ({
  type: ClientTypeKeys.REMOVE,
  id: id2,
});
