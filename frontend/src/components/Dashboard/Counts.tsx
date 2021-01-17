import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Key = 'statements' | 'tosfs' | 'billingForms' | 'billingDetails' | 'students' | 'fees';

type CountResponse = {
	[key in Key]: number;
};

export function Counts() {
	const [statements, setStatements] = useState(0);
	const [tosfs, setTOSFs] = useState(0);
	const [billingForms, setBillingForms] = useState(0);
	const [billingDetails, setBillingDetails] = useState(0);
	const [students, setStudents] = useState(0);
	const [fees, setFees] = useState(0);

	const fetchCounts = async () => {
		try {
			const {
				data: { statements, tosfs, billingDetails, billingForms, students, fees },
			} = await axios.get<CountResponse>('/counts');
			setStatements(statements);
			setTOSFs(tosfs);
			setBillingForms(billingForms);
			setBillingDetails(billingDetails);
			setStudents(students);
			setFees(fees);
		} catch (error) {
			console.log(error.toJSON());
		}
	};

	useEffect(() => {
		fetchCounts();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='row'>
			<div className='col-xl-3 col-md-6'>
				<div className='card card-stats'>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<h5 className='card-title text-uppercase text-muted mb-0'>Total Statements</h5>
								<span className='h2 font-weight-bold mb-0'>{statements}</span>
							</div>
							<div className='col-auto'>
								<div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
									<i className='ni ni-books'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-xl-3 col-md-6'>
				<div className='card card-stats'>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<h5 className='card-title text-uppercase text-muted mb-0'>
									Total <div>TOSFs</div>
								</h5>
								<span className='h2 font-weight-bold mb-0'>{tosfs}</span>
							</div>
							<div className='col-auto'>
								<div className='icon icon-shape bg-gradient-orange text-white rounded-circle shadow'>
									<i className='ni ni-paper-diploma'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-xl-3 col-md-6'>
				<div className='card card-stats'>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<h5 className='card-title text-uppercase text-muted mb-0'>Total Billing Forms</h5>
								<span className='h2 font-weight-bold mb-0'>{billingForms}</span>
							</div>
							<div className='col-auto'>
								<div className='icon icon-shape bg-gradient-green text-white rounded-circle shadow'>
									<i className='ni ni-single-copy-04'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-xl-3 col-md-6'>
				<div className='card card-stats'>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<h5 className='card-title text-uppercase text-muted mb-0'>Total Billing Details</h5>
								<span className='h2 font-weight-bold mb-0'>{billingDetails}</span>
							</div>
							<div className='col-auto'>
								<div className='icon icon-shape bg-gradient-info text-white rounded-circle shadow'>
									<i className='ni ni-compass-04'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-md-6'>
				<div className='card card-stats'>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<h5 className='card-title text-uppercase text-muted mb-0'>Total Students</h5>
								<span className='h2 font-weight-bold mb-0'>{students}</span>
							</div>
							<div className='col-auto'>
								<div className='icon icon-shape bg-gradient-blue text-white rounded-circle shadow'>
									<i className='ni ni-circle-08'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-md-6'>
				<div className='card card-stats'>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<h5 className='card-title text-uppercase text-muted mb-0'>Total Fees</h5>
								<span className='h2 font-weight-bold mb-0'>{fees}</span>
							</div>
							<div className='col-auto'>
								<div className='icon icon-shape bg-gradient-yellow text-white rounded-circle shadow'>
									<i className='ni ni-credit-card'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
