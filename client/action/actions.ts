// TODO make api action call
import { Base64 } from 'js-base64';
import { DocumentsAction, IDAction, TypeKeys as ClientTypeKeys } from './client';
import { AddAction, RemoveAction, TypeKeys as SubscribeTypeKeys } from './subscribe';

import Idpw from '../idpw';
import { Document, Subscribe } from '../model';

const apiDocuments = (id: string): Promise<string[]> => {
  const membersURL = `http://sunho.kim/api/clients/` + id;
  return fetch(membersURL, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + Base64.encode(Idpw.id + ':' + Idpw.pw),
        },
       })
    .then((response) => (response.json()))
    .then((json) => (json.data));
};

export const fetchSubscribes = (subs: Subscribe[]) => (dispatch) => {
  for (const sub of subs) {
    dispatch(fetchDocuments(sub.id, sub.name));
  }
};

export const fetchDocuments = (id: string, name: string) => (dispatch) => {
  apiDocuments(id)
  .then((data: object) => {
    let documents: Document[] = [];
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
  const membersURL = `http://sunho.kim/api/clients`;
  return fetch(membersURL, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + Base64.encode(Idpw.id + ':' + Idpw.pw),
        },
       })
    .then((response) => (response.json()))
    .then((json) => (json.clients));
};

export const fetchClientID = () => (dispatch) => {
  apiClientID()
  .then((ids) => {
    dispatch(fetchIDsComplete(ids));
  });
};

const fetchIDsComplete = (ids2: string[]): IDAction => ({
  type: ClientTypeKeys.IDS,
  ids: ids2,
});

const fetchDocumentsComplete = (id2: string, name2: string, documents2: Document[]): DocumentsAction => ({
  type: ClientTypeKeys.DOCUMENTS,
  id: id2,
  name: name2,
  documents: documents2,
});

export const addSubsribe = (id2: string, name2: string): AddAction => ({
  type: SubscribeTypeKeys.ADD,
  id: id2,
  name: name2,
});

export const removeSubscribe = (id2: string): RemoveAction => ({
  type: SubscribeTypeKeys.REMOVE,
  id: id2,
});
