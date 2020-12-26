import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormMode, Statement, StatementRow } from '../../contracts';
import { exceptMany, handleError } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [processing, setProcessing] = useState(false);
	const [school, setSchool] = useState('');
	const [schoolAddress, setSchoolAddress] = useState('');
	const [referenceNumber, setReferenceNumber] = useState('');
	const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
	const [to, setTo] = useState('');
	const [toAddress, setToAddress] = useState('');
	const [rows, setRows] = useState<Array<Partial<StatementRow>>>([]);
	const history = useHistory();

	const submit = async () => {
		setProcessing(true);
		try {
			const payload = {
				school,
				schoolAddress,
				referenceNumber,
				date,
				to,
				toAddress,
				rows,
			};
			await (mode === 'Add' ? axios.post<Statement>('/statements', payload) : axios.put<Statement>(`/statements/${id}`, payload));
			toastr.success('Statement saved successfully.');
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	const fetchStatement = async (statementID: string) => {
		setMode('Edit');
		try {
			const {
				data: { school, schoolAddress, referenceNumber, date, to, toAddress, rows, id },
			} = await axios.get<Statement>(`/statements/${statementID}`);
			setID(id);
			setSchool(school);
			setSchoolAddress(schoolAddress);
			setReferenceNumber(referenceNumber);
			setDate(dayjs(date).format('YYYY-MM-DD'));
			setTo(to);
			setToAddress(toAddress);
			setRows([...exceptMany(rows, ['createdAt', 'updatedAt'])]);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const { params, path } = useRouteMatch<{ id: string }>();

	// eslint-disable-next-line
	useEffect(() => {
		if (path.includes('edit')) {
			fetchStatement(params.id);
		}
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} Statement</h1>
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
							<label htmlFor='to'>To:</label>
							<input
								type='text'
								name='to'
								id='to'
								placeholder='To'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={to}
								onChange={(e) => setTo(e.target.value)}
							/>
						</div>
						<div className='col-12 col-md-6 col-lg-4 p-2'>
							<label htmlFor='to_address'>To Address:</label>
							<input
								type='text'
								name='to_address'
								id='to_address'
								placeholder='To Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								value={toAddress}
								onChange={(e) => setToAddress(e.target.value)}
							/>
						</div>

						<div className='col-12'>
							<label htmlFor='rows'>Rows:</label>
							<div className='p-3'>
								<div className='card'>
									<div className='card-header border-0'>
										<h3>Rows</h3>
										<button
											className='btn btn-warning btn-sm'
											onClick={(e) => {
												e.preventDefault();
												setRows([
													...rows,
													{
														title: '',
														description: '',
														code: '',
														amount: '',
													},
												]);
											}}>
											Add Row
										</button>
									</div>
									<div className='table-responsive'>
										<table className='table align-items-center table-flush'>
											<thead>
												<tr>
													<th scope='col' className='sort'>
														Title
													</th>
													<th scope='col' className='sort'>
														Description
													</th>
													<th scope='col' className='sort'>
														Code
													</th>
													<th scope='col' className='sort'>
														Amount
													</th>
													<th scope='col' className='sort text-center'>
														Actions
													</th>
												</tr>
											</thead>
											<tbody className='list'>
												{rows.map((row, index) => (
													<tr key={index}>
														<td>
															<input
																type='text'
																name={`title${index + 1}`}
																id={`title${index + 1}`}
																placeholder={`Title ${index + 1}`}
																className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
																disabled={processing}
																value={row.title}
																onChange={(e) => {
																	row.title = e.target.value;
																	rows.splice(index, 1, row);
																	setRows([...rows]);
																}}
															/>
														</td>
														<td>
															<input
																type='text'
																name={`description${index + 1}`}
																id={`description${index + 1}`}
																placeholder={`Description ${index + 1}`}
																className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
																disabled={processing}
																value={row.description}
																onChange={(e) => {
																	row.description = e.target.value;
																	rows.splice(index, 1, row);
																	setRows([...rows]);
																}}
															/>
														</td>
														<td>
															<input
																type='text'
																name={`code${index + 1}`}
																id={`code${index + 1}`}
																placeholder={`Code ${index + 1}`}
																className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
																disabled={processing}
																value={row.code}
																onChange={(e) => {
																	row.code = e.target.value;
																	rows.splice(index, 1, row);
																	setRows([...rows]);
																}}
															/>
														</td>
														<td>
															<input
																type='text'
																name={`amount${index + 1}`}
																id={`amount${index + 1}`}
																placeholder={`Amount ${index + 1}`}
																className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
																disabled={processing}
																value={row.amount}
																onChange={(e) => {
																	row.amount = e.target.value;
																	rows.splice(index, 1, row);
																	setRows([...rows]);
																}}
															/>
														</td>
														<td className='text-center'>
															<button
																className='btn btn-danger btn-sm'
																onClick={(e) => {
																	e.preventDefault();
																	rows.splice(index, 1);
																	setRows([...rows]);
																}}>
																Remove Row
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 p-2'>
							<button type='submit' className='btn btn-info btn-sm'>
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
