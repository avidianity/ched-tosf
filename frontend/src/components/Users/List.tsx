import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../../contracts';
import { Table } from '../Shared/Table';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { onlyMany } from '../../helpers';

export function List() {
	const [users, setUsers] = useState<Array<User>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchUsers = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<User>>('/users');
			setUsers(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch users.');
		} finally {
			setProcessing(false);
		}
	};

	const deleteUser = async (id: number) => {
		setProcessing(true);
		try {
			await Axios.delete(`/users/${id}`);
			toastr.success('User deleted successfully.');
			await fetchUsers();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete user.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<Table
			title='Users'
			data={users}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={({ id }) => {
				history.push(path(`${id}`));
			}}
			onEditClick={({ id }) => {
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={({ id }) => {
				deleteUser(id);
			}}
			onRefreshClick={fetchUsers}
			withAction={true}
			pagination={true}
		/>
	);
}
