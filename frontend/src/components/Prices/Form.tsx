import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormMode, Price } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [processing, setProcessing] = useState(false);
	const [type, setType] = useState<FeeTypes>('Others');
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [first, setFirst] = useState('N\\A');
	const [second, setSecond] = useState('N\\A');
	const [third, setThird] = useState('N\\A');
	const [fourth, setFourth] = useState('N\\A');
	const history = useHistory();

	const submit = async () => {
		if (processing) return;
		setProcessing(true);
		try {
			const payload = {
				type,
				name,
				amount,
				first,
				second,
				third,
				fourth,
			};
			await (mode === 'Add' ? axios.post<Price>('/prices', payload) : axios.put<Price>(`/prices/${id}`, payload));
			toastr.success('Price saved successfully.');
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	const fetchPrice = async (priceID: string) => {
		setMode('Edit');
		try {
			const {
				data: { id, type, name, amount, first, second, third, fourth },
			} = await axios.get<Price>(`/prices/${priceID}`);
			setID(id);
			setType(type);
			setName(name);
			setAmount(amount);
			setFirst(first);
			setSecond(second);
			setThird(third);
			setFourth(fourth);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const { params, path } = useRouteMatch<{ id: string }>();

	useEffect(() => {
		if (path.includes('edit')) {
			fetchPrice(params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} Price</h1>
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
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='type'>Type:</label>
							<select
								name='type'
								id='type'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setType(e.target.value as FeeTypes)}
								value={type}>
								<option value='Tuition Fees'>Tuition Fees</option>
								<option value='Athletic Fee'>Athletic Fee</option>
								<option value='Computer Fee'>Computer Fee</option>
								<option value='Cultural Fee'>Cultural Fee</option>
								<option value='Development Fee'>Development Fee</option>
								<option value='Guidance Fee'>Guidance Fee</option>
								<option value='Handbook Fee'>Handbook Fee</option>
								<option value='Laboratory Fee'>Laboratory Fee</option>
								<option value='Library Fee'>Library Fee</option>
								<option value='Medical & Dental Fee'>Medical & Dental Fee</option>
								<option value='Registration Fee'>Registration Fee</option>
								<option value='Admission Fee'>Admission Fee</option>
								<option value='Entrance Fee'>Entrance Fee</option>
								<option value='Assessment Fee'>Assessment Fee</option>
								<option value='Others'>Others</option>
							</select>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='name'>Name:</label>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='amount'>Amount:</label>
							<input
								type='text'
								name='amount'
								id='amount'
								placeholder='Amount'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setAmount(e.target.value)}
								value={amount}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='first'>1st Year:</label>
							<input
								type='text'
								name='first'
								id='first'
								placeholder='1st Year'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setFirst(e.target.value)}
								value={first}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='second'>2nd Year:</label>
							<input
								type='text'
								name='second'
								id='second'
								placeholder='2nd Year'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setSecond(e.target.value)}
								value={second}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='third'>3rd Year:</label>
							<input
								type='text'
								name='third'
								id='third'
								placeholder='3rd Year'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setThird(e.target.value)}
								value={third}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='fourth'>4th Year:</label>
							<input
								type='text'
								name='fourth'
								id='fourth'
								placeholder='4th Year'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								onChange={(e) => setFourth(e.target.value)}
								value={fourth}
							/>
						</div>
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
