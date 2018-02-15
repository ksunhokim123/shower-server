import { Subscribe } from '../model';

export enum TypeKeys {
  ADD = 'subscribe_add',
  REMOVE = 'subscribe_remove',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface AddAction {
  type: TypeKeys.ADD;
  id: string;
  name: string;
}

export interface RemoveAction {
  type: TypeKeys.REMOVE;
  id: string;
}

export interface OtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type SubscribeAction =
   | AddAction
   | RemoveAction
   | OtherAction;
