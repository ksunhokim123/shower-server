// TODO make api action call
import { Base64 } from 'js-base64';
import { IDAction, TypeKeys } from './client';

const _fetchClientID= (): Promise<string[]> => {
  const membersURL = `http://sunho.kim/api/clients`;
  return fetch(membersURL, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + Base64.encode('test:test'),
        },
       })
    .then((response) => (response.json()))
    .then((json) => (json.clients));
};

export const fetchClientID = () => (dispatch) => {
  _fetchClientID()
  .then((ids) => {
    dispatch(fetchMembersCompleted(ids));
  });
};

const fetchMembersCompleted = (ids2: string[]): IDAction => ({
  type: TypeKeys.IDS,
  ids: ids2,
});
