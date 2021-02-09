import axios from 'axios';
import dayjs from 'dayjs';
import React, { Dispatch, useEffect, useState } from 'react';
import { BillingDetailRow, Student } from '../../../../contracts';
import { handleError } from '../../../../helpers';

type Props = {
	setRows: Dispatch<React.SetStateAction<Array<BillingDetailRow>>>;
	rows: Array<BillingDetailRow>;
	processing: boolean;
	onFeeChanged: (value: number, index: number) => void;
	onRowRemoved: (row: BillingDetailRow) => void;
};

export function Rows({ rows, setRows, processing, onFeeChanged, onRowRemoved }: Props) {
	const [students, setStudents] = useState<Array<Student>>([]);

	const fetchStudents = async () => {
		try {
			const { data } = await axios.get('/students');
			setStudents([...data]);
		} catch (error) {
			handleError(error);
		}
	};

	const checkStudent = (index: number) => {
		const row = rows[index];

		const student = students.find((student) => student.firstName.includes(row.givenName) && student.lastName.includes(row.lastName));

		if (student) {
			row.middleInitial = student.middleName[0];
			row.sex = student.sex;
			row.email = student.email;
			row.number = student.number;

			rows.splice(index, 1, row);
			setRows([...rows]);
		}
	};

	useEffect(() => {
		fetchStudents();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='col-12'>
			<div className='p-3'>
				<div className='card'>
					<div className='card-header border-0'>
						<h3>Rows</h3>
						<button
							className={`btn btn-warning btn-sm ${processing ? 'disabled' : ''}`}
							disabled={processing}
							onClick={(e) => {
								e.preventDefault();
								setRows([
									...rows,
									{
										sequenceNumber: '',
										lastName: '',
										givenName: '',
										middleInitial: '',
										degreeProgram: '',
										year: '1st Year',
										sex: 'Male',
										birthday: dayjs(new Date()).format('YYYY-MM-DD'),
										email: '',
										number: '',
										fee: '',
										remarks: '',
									} as BillingDetailRow,
								]);
							}}>
							Add Row
						</button>
					</div>
					<div className='py-1 px-2 m-1'>
						{rows.map((row, index) => (
							<div className='card border' key={index}>
								<div className='card-header'>
									<h3 className='card-title'>Row {index + 1}</h3>
									<div className='d-flex'>
										<button
											className={`btn btn-danger btn-sm ${processing ? 'disabled' : ''}`}
											disabled={processing}
											onClick={(e) => {
												e.preventDefault();
												onRowRemoved(rows[index]);
												rows.splice(index, 1);
												setRows([...rows]);
											}}>
											Remove Row {index + 1}
										</button>
									</div>
								</div>
								<div className='card-body'>
									<div className='row'>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='sequenceNumber'>Sequence Number:</label>
											<input
												type='text'
												name='sequenceNumber'
												id='sequenceNumber'
												placeholder='Sequence Number'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.sequenceNumber = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.sequenceNumber}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='lastName'>Last Name:</label>
											<input
												type='text'
												name='lastName'
												id='lastName'
												placeholder='Last Name'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.lastName = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													checkStudent(index);
												}}
												value={row.lastName}
												list='lastNameList'
											/>
											<datalist id='lastNameList'>
												{students.map((student, index) => (
													<option value={student.lastName} key={index} />
												))}
											</datalist>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='givenName'>Given Name:</label>
											<input
												type='text'
												name='givenName'
												id='givenName'
												placeholder='Given Name'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.givenName = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													checkStudent(index);
												}}
												value={row.givenName}
												list='firstNameList'
											/>
											<datalist id='firstNameList'>
												{students.map((student, index) => (
													<option value={student.firstName} key={index} />
												))}
											</datalist>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='middleInitial'>Middle Initial:</label>
											<input
												type='text'
												name='middleInitial'
												id='middleInitial'
												placeholder='Middle Initial'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.middleInitial = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.middleInitial}
											/>
											<datalist id='lastNameList'>
												{students.map((student, index) => (
													<option value={student.middleName[0]} key={index}>
														{student.middleName}
													</option>
												))}
											</datalist>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='degreeProgram'>Degree Program:</label>
											<input
												type='text'
												name='degreeProgram'
												id='degreeProgram'
												placeholder='Degree Program'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.degreeProgram = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.degreeProgram}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='year'>Year:</label>
											<select
												name='year'
												id='year'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												value={row.year}
												onChange={(e) => {
													row.year = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}>
												{['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', '6th Year'].map(
													(year, index) => (
														<option value={year} key={index}>
															{year}
														</option>
													)
												)}
											</select>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='sex'>Sex:</label>
											<select
												name='sex'
												id='sex'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												value={row.sex}
												onChange={(e) => {
													row.sex = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}>
												<option value='Male'>Male</option>
												<option value='Female'>Female</option>
											</select>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='birthday'>Birthday:</label>
											<input
												type='date'
												name='birthday'
												id='birthday'
												placeholder='Birthday'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												value={row.birthday}
												onChange={(e) => {
													row.birthday = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='email'>Email:</label>
											<input
												type='email'
												name='email'
												id='email'
												placeholder='Email'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.email = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.email}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='number'>Number:</label>
											<input
												type='text'
												name='number'
												id='number'
												placeholder='Number'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.number = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.number}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='fee'>Fee:</label>
											<input
												type='text'
												name='fee'
												id='fee'
												placeholder='Fee'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.fee = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged(row.fee.parseNumbers(), index);
												}}
												value={row.fee}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='remarks'>Remarks:</label>
											<input
												type='text'
												name='remarks'
												id='remarks'
												placeholder='Remarks'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.remarks = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.remarks}
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
