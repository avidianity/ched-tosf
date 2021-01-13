import React, { Dispatch } from 'react';
import { BillingFormRow } from '../../../../contracts';

type Props = {
	setRows: Dispatch<React.SetStateAction<Array<BillingFormRow>>>;
	rows: Array<BillingFormRow>;
	processing: boolean;
	onFeeChanged: (key: keyof BillingFormRow, value: number, index: number) => void;
	onRowRemoved: (row: BillingFormRow) => void;
};

export function Rows({ rows, setRows, processing, onFeeChanged, onRowRemoved }: Props) {
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
										studentNumber: '',
										referenceNumber: '',
										lastName: '',
										givenName: '',
										middleInitial: '',
										degreeProgram: '',
										year: '1st Year',
										sex: 'Male',
										email: '',
										phoneNumber: '',
										laboratoryUnits: 'N\\A',
										computerLabUnits: 'N\\A',
										unitsEnrolled: 'N\\A',
										nstpUnitsEnrolled: 'N\\A',
										tuitionFee: 'N\\A',
										nstpFee: 'N\\A',
										athleticFees: 'N\\A',
										computerFees: 'N\\A',
										culturalFees: 'N\\A',
										developmentFees: 'N\\A',
										admissionFees: 'N\\A',
										guidanceFees: 'N\\A',
										handbookFees: 'N\\A',
										laboratoryFees: 'N\\A',
										libraryFee: 'N\\A',
										medicalFees: 'N\\A',
										registrationFees: 'N\\A',
										schoolIDFees: 'N\\A',
										totalTOSF: '',
									} as BillingFormRow,
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
											<label htmlFor='studentNumber'>Student Number:</label>
											<input
												type='text'
												name='studentNumber'
												id='studentNumber'
												placeholder='Student Number'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.studentNumber = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.studentNumber}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='referenceNumber'>Reference Number:</label>
											<input
												type='text'
												name='referenceNumber'
												id='referenceNumber'
												placeholder='Learner&#39;s Reference Number'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.referenceNumber = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.referenceNumber}
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
												}}
												value={row.lastName}
											/>
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
												}}
												value={row.givenName}
											/>
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
											<label htmlFor='phoneNumber'>Phone Number:</label>
											<input
												type='text'
												name='phoneNumber'
												id='phoneNumber'
												placeholder='Phone Number'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.phoneNumber = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.phoneNumber}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='laboratoryUnits'>Laboratory Units/Subject:</label>
											<input
												type='text'
												name='laboratoryUnits'
												id='laboratoryUnits'
												placeholder='Laboratory Units/Subject'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.laboratoryUnits = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.laboratoryUnits}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='computerLabUnits'>Computer Lab Units:</label>
											<input
												type='text'
												name='computerLabUnits'
												id='computerLabUnits'
												placeholder='Computer Lab Units/Subject'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.computerLabUnits = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.computerLabUnits}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='unitsEnrolled'>Units Enrolled:</label>
											<input
												type='text'
												name='unitsEnrolled'
												id='unitsEnrolled'
												placeholder='Units Enrolled'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.unitsEnrolled = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.unitsEnrolled}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='nstpUnitsEnrolled'>NSTP Units Enrolled:</label>
											<input
												type='text'
												name='nstpUnitsEnrolled'
												id='nstpUnitsEnrolled'
												placeholder='NSTP Units Enrolled'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.nstpUnitsEnrolled = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
												}}
												value={row.nstpUnitsEnrolled}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='tuitionFee'>Tuition Fee:</label>
											<input
												type='text'
												name='tuitionFee'
												id='tuitionFee'
												placeholder='Tuition Fee'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.tuitionFee = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('tuitionFee', row.tuitionFee.parseNumbers(), index);
												}}
												value={row.tuitionFee}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='nstpFee'>NSTP Fee:</label>
											<input
												type='text'
												name='nstpFee'
												id='nstpFee'
												placeholder='NSTP Fee'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.nstpFee = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('nstpFee', row.nstpFee.parseNumbers(), index);
												}}
												value={row.nstpFee}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='athleticFees'>Athletic Fees:</label>
											<input
												type='text'
												name='athleticFees'
												id='athleticFees'
												placeholder='Athletic Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.athleticFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('athleticFees', row.athleticFees.parseNumbers(), index);
												}}
												value={row.athleticFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='computerFees'>Computer fees:</label>
											<input
												type='text'
												name='computerFees'
												id='computerFees'
												placeholder='Computer fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.computerFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('computerFees', row.computerFees.parseNumbers(), index);
												}}
												value={row.computerFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='culturalFees'>Cultural Fees:</label>
											<input
												type='text'
												name='culturalFees'
												id='culturalFees'
												placeholder='Cultural Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.culturalFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('culturalFees', row.culturalFees.parseNumbers(), index);
												}}
												value={row.culturalFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='developmentFees'>Development Fees:</label>
											<input
												type='text'
												name='developmentFees'
												id='developmentFees'
												placeholder='Development Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.developmentFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('developmentFees', row.developmentFees.parseNumbers(), index);
												}}
												value={row.developmentFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='admissionFees'>Admission Fees:</label>
											<input
												type='text'
												name='admissionFees'
												id='admissionFees'
												placeholder='Admission Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.admissionFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('admissionFees', row.admissionFees.parseNumbers(), index);
												}}
												value={row.admissionFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='guidanceFees'>Guidance Fees:</label>
											<input
												type='text'
												name='guidanceFees'
												id='guidanceFees'
												placeholder='Guidance Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.guidanceFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('guidanceFees', row.guidanceFees.parseNumbers(), index);
												}}
												value={row.guidanceFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='handbookFees'>Handbook Fees:</label>
											<input
												type='text'
												name='handbookFees'
												id='handbookFees'
												placeholder='Handbook Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.handbookFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('handbookFees', row.handbookFees.parseNumbers(), index);
												}}
												value={row.handbookFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='laboratoryFees'>Laboratory Fees:</label>
											<input
												type='text'
												name='laboratoryFees'
												id='laboratoryFees'
												placeholder='Laboratory Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.laboratoryFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('laboratoryFees', row.laboratoryFees.parseNumbers(), index);
												}}
												value={row.laboratoryFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='libraryFee'>Library Fee:</label>
											<input
												type='text'
												name='libraryFee'
												id='libraryFee'
												placeholder='Library Fee'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.libraryFee = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('libraryFee', row.libraryFee.parseNumbers(), index);
												}}
												value={row.libraryFee}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='medicalFees'>Medical Fees:</label>
											<input
												type='text'
												name='medicalFees'
												id='medicalFees'
												placeholder='Medical Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.medicalFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('medicalFees', row.medicalFees.parseNumbers(), index);
												}}
												value={row.medicalFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='registrationFees'>Registration Fees:</label>
											<input
												type='text'
												name='registrationFees'
												id='registrationFees'
												placeholder='Registration Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.registrationFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('registrationFees', row.registrationFees.parseNumbers(), index);
												}}
												value={row.registrationFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='schoolIDFees'>School ID Fees:</label>
											<input
												type='text'
												name='schoolIDFees'
												id='schoolIDFees'
												placeholder='School ID Fees'
												className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
												disabled={processing}
												onChange={(e) => {
													row.schoolIDFees = e.target.value;
													rows.splice(index, 1, row);
													setRows([...rows]);
													onFeeChanged('schoolIDFees', row.schoolIDFees.parseNumbers(), index);
												}}
												value={row.schoolIDFees}
											/>
										</div>
										<div className='col-12 col-md-4 col-lg-3 form-group'>
											<label htmlFor='totalTOSF'>Total TOSF:</label>
											<input
												type='text'
												name='totalTOSF'
												id='totalTOSF'
												placeholder='Total TOSF'
												className='form-control form-control-sm disabled'
												readOnly={true}
												onChange={(e) => {
													// row.totalTOSF = e.target.value;
													// rows.splice(index, 1, row);
													// setRows([...rows]);
												}}
												value={row.totalTOSF}
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
