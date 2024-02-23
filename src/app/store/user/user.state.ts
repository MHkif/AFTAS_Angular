import { User } from 'src/app/models/user.model';

export interface UserAuthState {
  user: User | undefined;
}

export const initialState: UserAuthState = {
  user: undefined,
};
