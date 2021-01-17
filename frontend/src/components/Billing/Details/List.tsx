import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { exceptMany } from '../../../helpers';
import { BillingDetail } from '../../../contracts';
import { Table } from '../../Shared/Table';
import dayjs from 'dayjs';

export function List() {
	const [billingDetails, setBillingDetails] = useState<Array<BillingDetail>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchBillingDetails = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<BillingDetail>>('/billing/details');
			setBillingDetails(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch Billing Details.');
		} finally {
			setProcessing(false);
		}
	};

	const deleteBillingDetail = async (id: number) => {
		setProcessing(true);
		try {
			await Axios.delete(`/billing/details/${id}`);
			toastr.success('Billing Detail deleted successfully.');
			await fetchBillingDetails();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete Billing Detail.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchBillingDetails();
	}, []);

	return (
		<Table
			title='Billing Details'
			data={exceptMany(billingDetails, ['rows']).map((row) => ({
				...row,
				date: dayjs(row.date).format('MMMM DD, YYYY'),
			}))}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={({ id }) => {
				history.push(path(`${id}`));
			}}
			onEditClick={({ id }) => {
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={({ id }) => {
				deleteBillingDetail(id);
			}}
			onRefreshClick={fetchBillingDetails}
			withAction={true}
			pagination={true}
		/>
	);
}
