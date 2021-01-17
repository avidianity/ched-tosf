import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Price } from '../../contracts';
import { Table } from '../Shared/Table';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';

export function List() {
	const [prices, setPrices] = useState<Array<Price>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchPrices = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<Price>>('/prices');
			setPrices(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch prices.');
		} finally {
			setProcessing(false);
		}
	};

	const deletePrice = async ({ id }: Price) => {
		setProcessing(true);
		try {
			await Axios.delete(`/prices/${id}`);
			toastr.success('Price deleted successfully.');
			await fetchPrices();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete price.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchPrices();
	}, []);

	return (
		<Table
			title='Prices'
			data={prices}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={(index) => {
				const { id } = prices[index];
				history.push(path(`${id}`));
			}}
			onEditClick={(index) => {
				const { id } = prices[index];
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={(index) => {
				const price = prices[index];
				deletePrice(price);
			}}
			onRefreshClick={fetchPrices}
			withAction={true}
			pagination={true}
		/>
	);
}
