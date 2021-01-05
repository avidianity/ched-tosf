import axios from 'axios';
import React, { useEffect, useState } from 'react';

type CountResponse = {
	statements: number;
	tosfs: number;
	billingForms: number;
	billingDetails: number;
};

export function Counts() {
	const [statements, setStatements] = useState(0);
	const [tosfs, setTOSFs] = useState(0);
	const [billingForms, setBillingForms] = useState(0);
	const [billingDetails, setBillingDetails] = useState(0);

	const fetchCounts = async () => {
		try {
			const {
				data: { statements, tosfs, billingDetails, billingForms },
			} = await axios.get<CountResponse>('/counts');
			setStatements(statements);
			setTOSFs(tosfs);
			setBillingForms(billingForms);
			setBillingDetails(billingDetails);
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
		</div>
	);
}
