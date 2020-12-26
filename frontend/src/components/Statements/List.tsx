import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Statement } from '../../contracts/Statement';
import { Table } from '../Shared/Table';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { exceptMany } from '../../helpers';

export function List() {
	const [statements, setStatements] = useState<Array<Statement>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchStatements = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<Statement>>('/statements');
			setStatements(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch statements.');
		} finally {
			setProcessing(false);
		}
	};

	const deleteStatement = async ({ id }: Statement) => {
		setProcessing(true);
		try {
			await Axios.delete(`/statements/${id}`);
			toastr.success('Statement deleted successfully.');
			await fetchStatements();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete statement.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchStatements();
	}, []);

	return (
		<Table
			title='Statements'
			data={exceptMany(statements, ['rows'])}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={(index) => {
				const { id } = statements[index];
				history.push(path(`${id}`));
			}}
			onEditClick={(index) => {
				const { id } = statements[index];
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={(index) => {
				const statement = statements[index];
				deleteStatement(statement);
			}}
			onRefreshClick={fetchStatements}
			withAction={true}
			pagination={true}
		/>
	);
}
