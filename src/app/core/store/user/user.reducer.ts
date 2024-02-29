import { Action, createReducer, on } from '@ngrx/store';
import { UserAuthState, initialState } from './user.state';
import { loginSuccessAction, logoutAction } from './user.action';

const _authReducer = createReducer(
  initialState,
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logoutAction, (state) => {
    return {
      ...state,
      user: undefined,
    };
  })
);

export function userAuthReducer(
  state: UserAuthState | undefined,
  action: Action
) {
  return _authReducer(state, action);
}
