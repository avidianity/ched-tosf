import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { BillingDetails } from './Details';
import { BillingForms } from './Forms';
import { Menu } from './Menu';

export function Billing() {
	const match = useRouteMatch();
	const path = (path: string) => `${match.path}${path}`;
	return (
		<Switch>
			<Route path={path('/')} exact component={Menu} />
			<Route path={path('/forms')} component={BillingForms} />
			<Route path={path('/details')} component={BillingDetails} />
		</Switch>
	);
}
