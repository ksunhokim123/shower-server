export enum TypeKeys {
  PROPOSE = 'error_propose',
  DISMISS = 'error_dismiss',
  OTHER_ACTION = '__any_other_action_type__',
}

export interface ProposeAction {
  type: TypeKeys.PROPOSE;
  code: number;
  message: string;
  from: string;
}

export interface DismissAction {
  type: TypeKeys.DISMISS;
}

export interface OtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type ErrorAction =
   | ProposeAction
   | DismissAction
   | OtherAction;
