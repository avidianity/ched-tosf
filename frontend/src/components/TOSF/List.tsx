import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TOSF } from '../../contracts/TOSF';
import { Table } from '../Shared/Table';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { exceptMany } from '../../helpers';

export function List() {
	const [TOSFs, setTOSFs] = useState<Array<TOSF>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchTOSFs = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<TOSF>>('/tosfs');
			setTOSFs(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch TOSFs.');
		} finally {
			setProcessing(false);
		}
	};

	const deleteTOSF = async (id: number) => {
		setProcessing(true);
		try {
			await Axios.delete(`/TOSFs/${id}`);
			toastr.success('TOSF deleted successfully.');
			await fetchTOSFs();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete TOSF.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchTOSFs();
	}, []);

	return (
		<Table
			title='TOSFs'
			data={exceptMany(TOSFs, ['fees'])}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={({ id }) => {
				history.push(path(`${id}`));
			}}
			onEditClick={({ id }) => {
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={({ id }) => {
				deleteTOSF(id);
			}}
			onRefreshClick={fetchTOSFs}
			withAction={true}
			pagination={true}
		/>
	);
}
