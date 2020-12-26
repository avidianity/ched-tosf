import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Dashboard } from './components/Dashboard';
import { UserContext } from './contexts';
import { User } from './contracts';
import { routes } from './routes';
import Axios from 'axios';
import state from './state';
import { makeMask } from './helpers';

Axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function App() {
	const [user, setUser] = useState<User | null>(state.has('user') ? state.get<User>('user') : null);
	const [token, setToken] = useState<string | null>(state.has('token') ? state.get<string>('token') : null);

	const isLogged = () => user !== null;

	Axios.interceptors.response.use((response) => {
		if (response.status === 401) {
			state.set('token', null).set('user', null);
			setUser(null);
			setToken(null);
		}
		return response;
	});

	useEffect(() => {
		if (token) {
			Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		}
	}, [token]);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<UserContext.Provider
						value={{
							user,
							setUser: makeMask(setUser, (user: User | null) => state.set('user', user || null)),
							isLogged,
							token,
							setToken: makeMask(setToken, (token: string | null) => state.set('token', token || null)),
						}}>
						<Route path={routes.DASHBOARD} component={Dashboard} />
						<Route path={routes.LOGIN} component={Login} />
						<Route path={routes.REGISTER} component={Register} />
						{/* <Redirect to={routes.LOGIN} /> */}
					</UserContext.Provider>
				</Switch>
			</Router>
		</div>
	);
}
