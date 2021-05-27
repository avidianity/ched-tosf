import React from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { routes } from '../../routes';

export function Navbar() {
	const match = useRouteMatch();
	const path = (path: string) => `${match.path}${path}`;
	return (
		<nav className='sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white' id='sidenav-main'>
			<div className='scrollbar-inner'>
				<div className='sidenav-header  align-items-center'>
					<Link className='navbar-brand' to={routes.DASHBOARD}>
						<img src='/assets/logo.png' className='navbar-brand-img' alt='...' />
					</Link>
				</div>
				<div className='navbar-inner'>
					<div className='collapse navbar-collapse' id='sidenav-collapse-main'>
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<NavLink activeClassName='active' exact className='nav-link' to={routes.DASHBOARD}>
									<i className='ni ni-tv-2 text-primary'></i>
									<span className='nav-link-text'>Dashboard</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.STATEMENTS)} className='nav-link'>
									<i className='ni ni-books text-pink'></i>
									<span className='nav-link-text'>Statements</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.TOSF)} className='nav-link'>
									<i className='ni ni-paper-diploma text-success'></i>
									<span className='nav-link-text'>TOSF</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.BILLING.FORMS)} className='nav-link'>
									<i className='ni ni-single-copy-04 text-info'></i>
									<span className='nav-link-text'>Billing Forms</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.BILLING.DETAILS)} className='nav-link'>
									<i className='ni ni-compass-04 text-green'></i>
									<span className='nav-link-text'>Billing Details</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.FEES)} className='nav-link'>
									<i className='ni ni-credit-card text-danger'></i>
									<span className='nav-link-text'>Fees Management</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.STUDENTS)} className='nav-link'>
									<i className='ni ni-circle-08 text-blue'></i>
									<span className='nav-link-text'>Students</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.USERS)} className='nav-link'>
									<i className='ni ni-circle-08 text-info'></i>
									<span className='nav-link-text'>Users</span>
								</NavLink>
							</li>
							{/* <li className='nav-item'>
								<NavLink activeClassName='active' to={path(routes.FILES)} className='nav-link'>
									<i className='ni ni-archive-2 text-warning'></i>
									<span className='nav-link-text'>Files</span>
								</NavLink>
							</li> */}
						</ul>
						<hr className='my-3 d-none' />
						<div className='sidenav-toggler sidenav-toggler-dark d-none' data-action='sidenav-pin' data-target='#sidenav-main'>
							<div className='sidenav-toggler-inner'>
								<i className='sidenav-toggler-line bg-dark'></i>
								<i className='sidenav-toggler-line bg-dark'></i>
								<i className='sidenav-toggler-line bg-dark'></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
