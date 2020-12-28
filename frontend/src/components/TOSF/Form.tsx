import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Degree, FeeTypes, FormMode, TOSF, Fee as ParentFee } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';
import { Fees } from './Fees';

interface Fee {
	type: FeeTypes;
	degrees: Array<string>;
	year: string;
	costPerUnit: string;
	coverage: string;
	frequencyPerAY: string;
	referenceNumber: string;
	dateOfApproval: string;
	description: string;
	name: string;
	amount: string;
}

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [processing, setProcessing] = useState(false);
	const [school, setSchool] = useState('');
	const [address, setAddress] = useState('');
	const [preparedBy, setPreparedBy] = useState('');
	const [certifiedBy, setCertifiedBy] = useState('');
	const [approvedBy, setApprovedBy] = useState('');
	const [fees, setFees] = useState<Array<Fee>>([]);
	const [degrees, setDegrees] = useState<Array<string>>([]);
	const [degree, setDegree] = useState('');
	const [degreeSaving, setDegreeSaving] = useState(false);
	const history = useHistory();

	const submitFees = async (tosf: TOSF) => {
		function save() {
			return Promise.all(
				fees.map((fee) =>
					axios.post<Fee>('/tosfs/fees', {
						...fee,
						tosfId: tosf.id,
					})
				)
			);
		}
		if (mode === 'Edit') {
			await axios.delete(`/tosfs/fees/${tosf.id}/tosf`);
		}
		await save();
	};

	const submit = async () => {
		if (processing) return;
		setProcessing(true);
		try {
			const payload = {
				school,
				address,
				preparedBy,
				certifiedBy,
				approvedBy,
			};
			const { data } = await (mode === 'Add' ? axios.post<TOSF>('/tosfs', payload) : axios.put<TOSF>(`/tosfs/${id}`, payload));
			await submitFees(data);
			toastr.success('TOSF saved successfully.');
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	const fetchTOSF = async (tosfID: string) => {
		setMode('Edit');
		try {
			const {
				data: { school, address, preparedBy, certifiedBy, approvedBy, fees, id },
			} = await axios.get<TOSF>(`/tosfs/${tosfID}`);
			setID(id);
			setSchool(school);
			setAddress(address);
			setPreparedBy(preparedBy);
			setCertifiedBy(certifiedBy);
			setApprovedBy(approvedBy);
			setFees([
				...(await Promise.all(
					fees.map(async (fee) => {
						const { data } = await axios.get<ParentFee>(`/tosfs/fees/${fee.id}`);
						return {
							...data,
							degrees: data.degrees.map((degree) => degree.name),
							dateOfApproval: dayjs(fee.dateOfApproval).format('YYYY-MM-DD'),
						};
					})
				)),
			]);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const fetchDegrees = async () => {
		try {
			const { data } = await axios.get<Array<Degree>>('/degrees');
			setDegrees(data.map((degree) => degree.name));
		} catch (error) {
			handleError(error);
		}
	};

	const addDegree = async (name: string) => {
		setDegreeSaving(true);
		try {
			const { data } = await axios.post<Degree>('/degrees', { name });
			await fetchDegrees();
			setDegree('');
			toastr.info(`${data.name} has been added.`, 'Information');
		} catch (error) {
			handleError(error);
		} finally {
			setDegreeSaving(false);
		}
	};

	const { params, path } = useRouteMatch<{ id: string }>();

	useEffect(() => {
		fetchDegrees();
		if (path.includes('edit')) {
			fetchTOSF(params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} TOSF</h1>
			</div>
			<div className='col-12'>
				<b>NOTE:</b> If a degree you are looking for does not exist in the checkboxes, please add them to the textbox below. They
				will be saved for future inputs.
				<form
					className='p-1 d-flex form-inline'
					onSubmit={(e) => {
						e.preventDefault();
						addDegree(degree);
					}}>
					<label className='sr-only' htmlFor='degree'>
						Degree:
					</label>
					<input
						type='text'
						name='degree'
						id='degree'
						placeholder='Add Degree'
						className={`form-control form-control-sm align-self-center ${degreeSaving ? 'disabled' : ''}`}
						disabled={degreeSaving}
						value={degree}
						onChange={(e) => setDegree(e.target.value)}
					/>
					<button
						type='submit'
						className={`btn btn-info btn-sm ml-2 align-self-center ${degreeSaving ? 'disabled' : ''}`}
						disabled={degreeSaving}>
						{degreeSaving ? 'Adding...' : 'Add Degree'}
					</button>
				</form>
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
							<label htmlFor='address'>Address:</label>
							<input
								type='text'
								name='address'
								id='address'
								placeholder='Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={address}
								onChange={(e) => setAddress(e.target.value)}
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
						<Fees degrees={degrees} fees={fees} setFees={setFees} processing={processing} />
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
