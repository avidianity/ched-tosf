import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { ucwords } from '../../helpers';
import { routes } from '../../routes';

export function Header() {
	const match = useRouteMatch();
	const history = useHistory();
	const [path, setPath] = useState(match.path);

	const key = history.listen(() => setPath(window.location.pathname));

	useEffect(() => () => key(), [key]);

	const array = path.split('/');
	array.splice(0, 1);

	const makeLink = (path: string, index: number) => {
		const url = ['', ...array].filter((_, i) => i <= index).join('/');
		return `${url}/${path}`;
	};

	return (
		<div className='col-lg-6 col-7'>
			<nav
				aria-label='breadcrumb'
				className='d-none d-md-inline-block ml-md-4'>
				<ol className='breadcrumb breadcrumb-links breadcrumb-dark'>
					<li className='breadcrumb-item'>
						<Link to={routes.DASHBOARD}>
							<i className='fas fa-home'></i>
						</Link>
					</li>
					{array.map((title, index) => (
						<li
							className={`breadcrumb-item ${
								array.length - 1 === index ? 'active' : ''
							}`}
							key={index}>
							{array.length - 1 !== index ? (
								<Link to={makeLink(title, index)}>
									{ucwords(title.split('-').join(' '))}
								</Link>
							) : (
								ucwords(title.split('-').join(' '))
							)}
						</li>
					))}
				</ol>
			</nav>
		</div>
	);
}
