import axios from 'axios';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Student } from '../../contracts';
import { handleError } from '../../helpers';

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

type Props = {
	setFees: Dispatch<SetStateAction<Array<Fee>>>;
	fees: Array<Fee>;
	processing: boolean;
	degrees: Array<string>;
};

export function Fees({ setFees, fees, processing, degrees }: Props) {
	const [students, setStudents] = useState<Array<Student>>([]);

	const fetchStudents = async () => {
		try {
			const { data } = await axios.get<Array<Student>>('/students');
			setStudents([...data]);
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		fetchStudents();
		// eslint-disable-next-line
	}, []);

	const setStudent = (index: number, student: Student) => {};

	return (
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
										costPerUnit: 'N\\A',
										coverage: '',
										frequencyPerAY: '',
										referenceNumber: '',
										dateOfApproval: dayjs(new Date()).format('YYYY-MM-DD'),
										description: '',
										name: '',
										amount: '',
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
												<option value='Medical & Dental Fee'>Medical & Dental Fee</option>
												<option value='Registration Fee'>Registration Fee</option>
												<option value='Admission Fee'>Admission Fee</option>
												<option value='Entrance Fee'>Entrance Fee</option>
												<option value='Others'>Others</option>
											</select>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='name'>Name:</label>
											<input
												type='text'
												name='name'
												id='name'
												placeholder='Name'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												value={fee.name}
												onChange={(e) => {
													fee.name = e.target.value;
													fees.splice(index, 1, fee);
													setFees([...fees]);
												}}
												list='nameList'
											/>
											<datalist id='nameList'>
												{students.map((student, index) => (
													<option value={`${student.lastName}, ${student.firstName}`} key={index} />
												))}
											</datalist>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='amount'>Amount:</label>
											<input
												type='text'
												name='amount'
												id='amount'
												placeholder='Amount'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												value={fee.amount}
												onChange={(e) => {
													fee.amount = e.target.value;
													fees.splice(index, 1, fee);
													setFees([...fees]);
												}}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='degrees'>Degrees:</label>
											{degrees.map((degree, degreeIndex) => (
												<div className='custom-control custom-checkbox' key={degreeIndex}>
													<input
														type='checkbox'
														className={`custom-control-input ${processing ? 'disabled' : ''}`}
														disabled={processing}
														id={`fee${index}degree${degreeIndex}`}
														value={degree}
														onChange={(e) => {
															if (fee.degrees) {
																if (!fee.degrees.includes(e.target.value)) {
																	fee.degrees.push(e.target.value);
																} else {
																	fee.degrees.splice(fee.degrees.indexOf(e.target.value), 1);
																}
																fees.splice(index, 1, fee);
																setFees([...fees]);
															}
														}}
														checked={fee.degrees?.includes(degree)}
													/>
													<label className='custom-control-label' htmlFor={`fee${index}degree${degreeIndex}`}>
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												value={fee.year}
												onChange={(e) => {
													fee.year = e.target.value;
													fees.splice(index, 1, fee);
													setFees([...fees]);
												}}>
												{[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year, index) => (
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
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
	);
}
