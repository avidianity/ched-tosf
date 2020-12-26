import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { exceptMany } from '../../../helpers';
import { BillingForm } from '../../../contracts';
import { Table } from '../../Shared/Table';
import dayjs from 'dayjs';

export function List() {
	const [billingForms, setBillingForms] = useState<Array<BillingForm>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchBillingForms = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<BillingForm>>('/billing/forms');
			setBillingForms(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch Billing Forms.');
		} finally {
			setProcessing(false);
		}
	};

	const deleteBillingForm = async ({ id }: BillingForm) => {
		setProcessing(true);
		try {
			await Axios.delete(`/billing/forms/${id}`);
			toastr.success('Billing Form deleted successfully.');
			await fetchBillingForms();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete Billing Form.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchBillingForms();
	}, []);

	return (
		<Table
			title='Billing Forms'
			data={exceptMany(billingForms, ['rows']).map((row) => ({
				...row,
				date: dayjs(row.date).format('MMMM DD, YYYY'),
			}))}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={(index) => {
				const { id } = billingForms[index];
				history.push(path(`${id}`));
			}}
			onEditClick={(index) => {
				const { id } = billingForms[index];
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={(index) => {
				const billingForm = billingForms[index];
				deleteBillingForm(billingForm);
			}}
			onRefreshClick={fetchBillingForms}
			withAction={true}
			pagination={true}
		/>
	);
}
