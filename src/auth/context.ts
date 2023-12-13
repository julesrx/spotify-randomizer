import { UserProfile } from '@spotify/web-api-ts-sdk';
import { createContext } from 'react';

export const AuthContext = createContext<{ profile: UserProfile; signout: () => void }>({
  signout: () => {},
  profile: {} as UserProfile,
});
