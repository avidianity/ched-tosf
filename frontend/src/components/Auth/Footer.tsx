import React from 'react';

export function Footer() {
	return (
		<footer className='py-5' id='footer-main'>
			<div className='container'>
				<div className='row align-items-center justify-content-xl-between'>
					<div className='col-12'>
						<div className='copyright text-center text-xl-left text-muted'>
							&copy; 2020
							<a
								href='https://ched.gov.ph'
								className='font-weight-bold ml-1'
								target='_blank'
								rel='noreferrer'>
								CHED
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
