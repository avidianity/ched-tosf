import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Price } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [price, setPrice] = useState<Price | null>(null);
	const history = useHistory();

	const fetchPrice = async (id: string) => {
		try {
			const { data } = await axios.get<Price>(`/prices/${id}`);
			setPrice(data);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	useEffect(() => {
		fetchPrice(match.params.id);
		// eslint-disable-next-line
	}, []);

	const deletePrice = async ({ id }: Price) => {
		try {
			await axios.delete(`/prices/${id}`);
			toastr.success('Price deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete price.');
		}
	};

	return (
		<div className='row'>
			{price !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>View Fee</h3>
								<div className='d-flex ml-auto align-self-center'>
									<Link className='btn btn-warning btn-sm' to={`${window.location.pathname}/edit`}>
										{' '}
										<i className='fas fa-edit'></i> Edit
									</Link>
									<button
										type='button'
										data-toggle='modal'
										data-target={`#deleteModalPrice`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalPrice`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelPrice`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelPrice`}>
														Delete Price
													</h5>
													<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>Are you sure you want to delete this Price?</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalPrice`) as any;
															modal.modal('hide');
															deletePrice(price);
														}}>
														Confirm
													</button>
													<button type='button' className='btn btn-secondary btn-sm' data-dismiss='modal'>
														Cancel
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='card-body'>
							<p className='card-text'>
								Type: <b>{price.type}</b>
							</p>
							<p className='card-text'>
								Name: <b>{price.name}</b>
							</p>
							<p className='card-text'>
								Fee: <b>{price.amount}</b>
							</p>
							<p className='card-text'>
								1st Year: <b>{price.first}</b>
							</p>
							<p className='card-text'>
								2nd Year: <b>{price.second}</b>
							</p>
							<p className='card-text'>
								3rd Year: <b>{price.third}</b>
							</p>
							<p className='card-text'>
								4th Year: <b>{price.fourth}</b>
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className='col-12'>
					<div className='text-center'>
						<i className='fas fa-circle-notch fa-spin'></i>
					</div>
				</div>
			)}
		</div>
	);
}
