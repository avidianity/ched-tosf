import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';
import { FormMode, BillingDetailRow, BillingDetail } from '../../../../contracts';
import { handleError, exceptMany } from '../../../../helpers';
import { Rows } from './Rows';

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [processing, setProcessing] = useState(false);
	const [school, setSchool] = useState('');
	const [schoolAddress, setSchoolAddress] = useState('');
	const [referenceNumber, setReferenceNumber] = useState('');
	const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
	const [pageTotal, setPageTotal] = useState('');
	const [pageAccumulatedTotal, setPageAccumulatedTotal] = useState('');
	const [total, setTotal] = useState('');
	const [preparedBy, setPreparedBy] = useState('');
	const [certifiedBy, setCertifiedBy] = useState('');
	const [approvedBy, setApprovedBy] = useState('');
	const [rows, setRows] = useState<Array<BillingDetailRow>>([]);
	const history = useHistory();

	const onFeeChanged = (value: number, index: number) => {
		const fees = rows
			.filter((_, i) => i !== index)
			.map((row) => row.fee.parseNumbers())
			.reduce((i, x) => i + x, 0);
		setTotal(`${fees + value} PHP`);
	};

	const submitRows = async (BillingDetail: BillingDetail) => {
		if (mode === 'Edit') {
			await axios.delete(`/billing/details/row/${BillingDetail.id}/billing`);
		}
		await Promise.all(
			rows.map((row) =>
				axios.post<BillingDetailRow>('/billing/details/row', {
					...row,
					detailId: BillingDetail.id,
				})
			)
		);
	};

	const submit = async () => {
		if (processing) return;
		setProcessing(true);
		try {
			const payload = {
				school,
				schoolAddress,
				referenceNumber,
				date,
				pageTotal,
				pageAccumulatedTotal,
				total,
				preparedBy,
				certifiedBy,
				approvedBy,
			};
			const { data } = await (mode === 'Add'
				? axios.post<BillingDetail>('/billing/details', payload)
				: axios.put<BillingDetail>(`/billing/details/${id}`, payload));
			await submitRows(data);
			toastr.success('Billing Detail saved successfully.');
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	const fetchBillingDetail = async (billingDetailID: string) => {
		setMode('Edit');
		try {
			const {
				data: {
					school,
					schoolAddress,
					referenceNumber,
					date,
					pageTotal,
					pageAccumulatedTotal,
					total,
					preparedBy,
					certifiedBy,
					approvedBy,
					rows,
					id,
				},
			} = await axios.get<BillingDetail>(`/billing/details/${billingDetailID}`);
			setID(id);
			setSchool(school);
			setSchoolAddress(schoolAddress);
			setReferenceNumber(referenceNumber);
			setDate(dayjs(date).format('YYYY-MM-DD'));
			setPageTotal(pageTotal);
			setPageAccumulatedTotal(pageAccumulatedTotal);
			setTotal(total);
			setPreparedBy(preparedBy);
			setCertifiedBy(certifiedBy);
			setApprovedBy(approvedBy);
			setRows([...exceptMany(rows, ['createdAt', 'updatedAt'])]);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const { params, path } = useRouteMatch<{ id: string }>();

	useEffect(() => {
		if (path.includes('edit')) {
			fetchBillingDetail(params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} Billing Detail</h1>
			</div>
			<div className='col-12'>
				<hr className='mt-2 mb-3' />
			</div>
			<div className='col-12'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}>
					<div className='form-row'>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='school'>School:</label>
							<input
								type='text'
								name='school'
								id='school'
								placeholder='School'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={school}
								onChange={(e) => setSchool(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='school_address'>School Address:</label>
							<input
								type='text'
								name='school_address'
								id='school_address'
								placeholder='School Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={schoolAddress}
								onChange={(e) => setSchoolAddress(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='reference_number'>Reference Number:</label>
							<input
								type='text'
								name='reference_number'
								id='reference_number'
								placeholder='Reference Number'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={referenceNumber}
								onChange={(e) => setReferenceNumber(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='date'>Date:</label>
							<input
								type='date'
								name='date'
								id='date'
								placeholder='Date'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='pageTotal'>Page Total:</label>
							<input
								type='text'
								name='pageTotal'
								id='pageTotal'
								placeholder='Page Total'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={pageTotal}
								onChange={(e) => setPageTotal(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='pageAccumulatedTotal'>Page Accumulated Total:</label>
							<input
								type='text'
								name='pageAccumulatedTotal'
								id='pageAccumulatedTotal'
								placeholder='Page Accumulated Total'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={pageAccumulatedTotal}
								onChange={(e) => setPageAccumulatedTotal(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='total'>Total:</label>
							<input
								type='text'
								name='total'
								id='total'
								placeholder='Total'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={total}
								onChange={(e) => setTotal(e.target.value)}
							/>
						</div>

						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='preparedBy'>Prepared By:</label>
							<input
								type='text'
								name='preparedBy'
								id='preparedBy'
								placeholder='Prepared By'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={preparedBy}
								onChange={(e) => setPreparedBy(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='certifiedBy'>Certified By:</label>
							<input
								type='text'
								name='certifiedBy'
								id='certifiedBy'
								placeholder='Certified By'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={certifiedBy}
								onChange={(e) => setCertifiedBy(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='approvedBy'>Approved By:</label>
							<input
								type='text'
								name='approvedBy'
								id='approvedBy'
								placeholder='Approved By'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={approvedBy}
								onChange={(e) => setApprovedBy(e.target.value)}
							/>
						</div>
						<Rows onFeeChanged={onFeeChanged} rows={rows} setRows={setRows} processing={processing} />
						<div className='col-12 p-2'>
							<button type='submit' className={`btn btn-info btn-sm ${processing ? 'disabled' : ''}`} disabled={processing}>
								{processing ? (
									<div className='flex'>
										Saving... <i className='fas fa-circle-notch fa-spin'></i>
									</div>
								) : (
									'Save'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
