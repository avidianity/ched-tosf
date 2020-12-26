import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from './contracts';

export const UserContext = createContext(
	{} as {
		user: User | null;
		setUser: Dispatch<SetStateAction<User | null>>;
		token: string | null;
		setToken: Dispatch<SetStateAction<string | null>>;
		isLogged: () => boolean;
	}
);
