import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export function Menu() {
	const match = useRouteMatch();

	const path = (path: string) => `${match.path}${path}`;

	return (
		<div className='py-5 my-3'>
			<div className='d-flex'>
				<Link to={path('forms')} className='btn btn-secondary btn-lg mr-1 ml-auto align-self-center d-flex'>
					<i className='ni ni-single-copy-04 text-info align-self-center mr-1'></i> Forms
				</Link>

				<Link to={path('details')} className='btn btn-secondary btn-lg ml-1 mr-auto align-self-center d-flex'>
					<i className='ni ni-compass-04 text-danger align-self-center mr-1'></i> Details
				</Link>
			</div>
		</div>
	);
}
