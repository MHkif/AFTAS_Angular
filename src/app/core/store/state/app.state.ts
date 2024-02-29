import { userAuthReducer } from '../user/user.reducer';
import { UserAuthState } from '../user/user.state';

export interface AppState {
  userAuth: UserAuthState;
}

export const appReducer = {
  userAuth: userAuthReducer,
};
