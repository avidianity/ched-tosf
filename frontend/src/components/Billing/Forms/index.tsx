import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Form } from './Form';
import { List } from './List';
import { View } from './View';

export function BillingForms() {
	const match = useRouteMatch();
	const path = (path: string) => `${match.path}${path}`;
	return (
		<Switch>
			<Route path={path('/')} exact component={List} />
			<Route path={path('/add')} component={Form} />
			<Route path={path('/:id')} exact component={View} />
			<Route path={path('/:id/edit')} component={Form} />
		</Switch>
	);
}
