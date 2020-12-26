import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

export function Navbar() {
	return (
		<nav
			id='navbar-main'
			className='navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light'>
			<div className='container'>
				<Link className='navbar-brand' to={routes.DASHBOARD}>
					<img src='/assets/logo.png' alt='' />
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbar-collapse'
					aria-controls='navbar-collapse'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='navbar-collapse navbar-custom-collapse collapse'
					id='navbar-collapse'>
					<div className='navbar-collapse-header'>
						<div className='row'>
							<div className='col-6 collapse-brand'>
								<Link to={routes.DASHBOARD}>
									<img src='/assets/logo.png' alt='' />
								</Link>
							</div>
							<div className='col-6 collapse-close'>
								<button
									type='button'
									className='navbar-toggler'
									data-toggle='collapse'
									data-target='#navbar-collapse'
									aria-controls='navbar-collapse'
									aria-expanded='false'
									aria-label='Toggle navigation'>
									<span></span>
									<span></span>
								</button>
							</div>
						</div>
					</div>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link to={routes.LOGIN} className='nav-link'>
								<span className='nav-link-inner--text'>
									Login
								</span>
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={routes.REGISTER} className='nav-link'>
								<span className='nav-link-inner--text'>
									Register
								</span>
							</Link>
						</li>
					</ul>
					<hr className='d-lg-none' />
					<ul className='navbar-nav align-items-lg-center ml-lg-auto'>
						<li className='nav-item'>
							<a
								className='nav-link nav-link-icon'
								href='https://www.facebook.com/PhCHED.gov/'
								target='_blank'
								rel='noreferrer'
								data-toggle='tooltip'
								data-original-title='Like us on Facebook'>
								<i className='fab fa-facebook-square'></i>
								<span className='nav-link-inner--text d-lg-none'>
									Facebook
								</span>
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='nav-link nav-link-icon'
								href='https://twitter.com/PhCHED'
								rel='noreferrer'
								target='_blank'
								data-toggle='tooltip'
								data-original-title='Follow us on Twitter'>
								<i className='fab fa-twitter-square'></i>
								<span className='nav-link-inner--text d-lg-none'>
									Twitter
								</span>
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='nav-link nav-link-icon'
								href='https://github.com/avidianity/ched-tosf'
								target='_blank'
								rel='noreferrer'
								data-toggle='tooltip'
								data-original-title='Star us on Github'>
								<i className='fab fa-github'></i>
								<span className='nav-link-inner--text d-lg-none'>
									Github
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
