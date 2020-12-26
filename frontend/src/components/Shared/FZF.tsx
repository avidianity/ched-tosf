import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes';

export function FZF() {
	const history = useHistory();
	history.push(routes.LOGIN);
	return <div></div>;
}
