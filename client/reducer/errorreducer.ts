import { DismissAction, ErrorAction,  ProposeAction, TypeKeys } from '../action/error';
import { SunhoError } from '../model';

const createEmptySunhoError = (): SunhoError => ({
  code: 0,
  from: '',
  message: '',
  enabled: false,
});

export const ErrorReducer = (state: SunhoError= createEmptySunhoError(), action: ErrorAction ) => {
  switch (action.type) {
    case TypeKeys.PROPOSE:
      return {
        code: action.code,
        from: action.from,
        message: action.message,
        enabled: true,
      };
    case TypeKeys.DISMISS:
        return {
          ...state,
          enabled: false,
        };
    default:
      return state;
  }
};
