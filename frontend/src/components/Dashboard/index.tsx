import React, { useContext } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../contexts';
import { routes } from '../../routes';
import { Billing } from '../Billing';
import { Navbar } from '../Shared/Navbar';
import { Statements } from '../Statements';
import { TOSF } from '../TOSF';
import { Header } from './Header';
import { Nav } from './Nav';

export function Dashboard() {
	const { isLogged } = useContext(UserContext);
	const history = useHistory();
	if (!isLogged()) {
		history.push(routes.LOGIN);
	}
	const match = useRouteMatch();
	const path = (path: string) => `${match.path}${path}`;
	return (
		<div>
			<Navbar />
			<div className='main-content' id='panel'>
				<nav className='navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom'>
					<div className='container-fluid'>
						<Nav />
					</div>
				</nav>
				<div className='header bg-primary pb-3 mb-5'>
					<div className='container-fluid'>
						<div className='header-body'>
							<div className='row align-items-center py-4'>
								<Header />
								<div className='col-lg-6 col-5 text-right'>
									<button className='btn btn-sm btn-neutral'>New</button>
									<button className='btn btn-sm btn-neutral'>Filters</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='container-fluid mt--6 pt-5'>
					<Switch>
						<Route path={path('/statements')} component={Statements} />
						<Route path={path('/tosfs')} component={TOSF} />
						<Route path={path('/billing')} component={Billing} />
					</Switch>
				</div>
			</div>
		</div>
	);
}
