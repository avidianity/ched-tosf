import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Degree, FeeTypes, FormMode, TOSF, Fee as ParentFee } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';

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
	const [fees, setFees] = useState<Array<Partial<Fee>>>([]);
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
		setProcessing(true);
		try {
			const payload = {
				school,
				address,
				preparedBy,
				certifiedBy,
				approvedBy,
			};
			const { data } = await (mode === 'Add'
				? axios.post<TOSF>('/tosfs', payload)
				: axios.put<TOSF>(`/tosfs/${id}`, payload));
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

	// eslint-disable-next-line
	useEffect(() => {
		fetchDegrees();
		if (path.includes('edit')) {
			fetchTOSF(params.id);
		}
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} TOSF</h1>
			</div>
			<div className='col-12'>
				<b>NOTE:</b> If a degree you are looking for does not exist in the checkboxes, please add them to the
				textbox below. They will be saved for future inputs.
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
						<div className='col-12'>
							<div className='p-3'>
								<div className='card'>
									<div className='card-header border-0'>
										<h3>Fees</h3>
										<button
											className='btn btn-warning btn-sm'
											onClick={(e) => {
												e.preventDefault();
												setFees([
													...fees,
													{
														type: 'Tuition Fees',
														degrees: [],
														year: '2020',
														costPerUnit: '',
														coverage: '',
														frequencyPerAY: '',
														referenceNumber: '',
														dateOfApproval: dayjs().format('YYYY-MM-DD'),
														description: '',
													},
												]);
											}}>
											Add Fee
										</button>
									</div>
									<div className='py-1 px-2 m-1'>
										{fees.map((fee, index) => (
											<div className='card border' key={index}>
												<div className='card-header'>
													<h3 className='card-title'>Fee {index + 1}</h3>
													<div className='d-flex'>
														<button
															className='btn btn-danger btn-sm'
															onClick={(e) => {
																e.preventDefault();
																fees.splice(index, 1);
																setFees([...fees]);
															}}>
															Remove Fee {index + 1}
														</button>
													</div>
												</div>
												<div className='card-body'>
													<div className='row'>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='type'>Type:</label>
															<select
																name={`type${index + 1}`}
																id={`type${index + 1}`}
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.type}
																onChange={(e) => {
																	fee.type = e.target.value as any;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}>
																<option value='Tuition Fees'>Tuition Fees</option>
																<option value='Athletic Fee'>Athletic Fee</option>
																<option value='Computer Fee'>Computer Fee</option>
																<option value='Cultural Fee'>Cultural Fee</option>
																<option value='Development Fee'>Development Fee</option>
																<option value='Guidance Fee'>Guidance Fee</option>
																<option value='Handbook Fee'>Handbook Fee</option>
																<option value='Laboratory Fee'>Laboratory Fee</option>
																<option value='Library Fee'>Library Fee</option>
																<option value='Medical & Dental Fee'>
																	Medical & Dental Fee
																</option>
																<option value='Registration Fee'>
																	Registration Fee
																</option>
																<option value='Admission Fee'>Admission Fee</option>
																<option value='Entrance Fee'>Entrance Fee</option>
															</select>
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='degrees'>Degrees:</label>
															{degrees.map((degree, degreeIndex) => (
																<div className='custom-control custom-checkbox'>
																	<input
																		type='checkbox'
																		className={`custom-control-input ${
																			processing ? 'disabled' : ''
																		}`}
																		disabled={processing}
																		id={`fee${index}degree${degreeIndex}`}
																		value={degree}
																		onChange={(e) => {
																			if (fee.degrees) {
																				if (
																					!fee.degrees.includes(
																						e.target.value
																					)
																				) {
																					fee.degrees.push(e.target.value);
																				} else {
																					fee.degrees.splice(
																						fee.degrees.indexOf(
																							e.target.value
																						),
																						1
																					);
																				}
																				fees.splice(index, 1, fee);
																				setFees([...fees]);
																			}
																		}}
																		checked={fee.degrees?.includes(degree)}
																	/>
																	<label
																		className='custom-control-label'
																		htmlFor={`fee${index}degree${degreeIndex}`}>
																		{degree}
																	</label>
																</div>
															))}
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='year'>Year:</label>
															<select
																name='year'
																id='year'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.year}
																onChange={(e) => {
																	fee.year = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}>
																{[
																	2015,
																	2016,
																	2017,
																	2018,
																	2019,
																	2020,
																	2021,
																	2022,
																	2023,
																	2024,
																	2025,
																].map((year, index) => (
																	<option value={year} key={index}>
																		{year}
																	</option>
																))}
															</select>
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='costPerUnit'>Cost per Unit:</label>
															<input
																type='text'
																name='costPerUnit'
																id='costPerUnit'
																placeholder='Cost per Unit'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.costPerUnit}
																onChange={(e) => {
																	fee.costPerUnit = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}
															/>
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='coverage'>Coverage:</label>
															<input
																type='text'
																name='coverage'
																id='coverage'
																placeholder='Coverage'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.coverage}
																onChange={(e) => {
																	fee.coverage = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}
															/>
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='frequencyPerAY'>Frequency per AY:</label>
															<input
																type='text'
																name='frequencyPerAY'
																id='frequencyPerAY'
																placeholder='Frequency per AY'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.frequencyPerAY}
																onChange={(e) => {
																	fee.frequencyPerAY = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}
															/>
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='referenceNumber'>Reference Number:</label>
															<input
																type='text'
																name='referenceNumber'
																id='referenceNumber'
																placeholder='Reference Number'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.referenceNumber}
																onChange={(e) => {
																	fee.referenceNumber = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}
															/>
														</div>
														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='dateOfApproval'>Date of Approval:</label>
															<input
																type='date'
																name='dateOfApproval'
																id='dateOfApproval'
																placeholder='Date of Approval'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={dayjs(fee.dateOfApproval).format('YYYY-MM-DD')}
																onChange={(e) => {
																	fee.dateOfApproval = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}
															/>
														</div>

														<div className='col-12 col-md-4 col-lg-3 form-group'>
															<label htmlFor='description'>Description:</label>
															<input
																type='text'
																name='description'
																id='description'
																placeholder='Description'
																className={`form-control form-control-sm ${
																	processing ? 'disabled' : ''
																}`}
																disabled={processing}
																value={fee.description}
																onChange={(e) => {
																	fee.description = e.target.value;
																	fees.splice(index, 1, fee);
																	setFees([...fees]);
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										))}
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
