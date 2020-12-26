import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { BillingForm } from '../../../contracts';
import { exceptMany, handleError } from '../../../helpers';
import { Table } from '../../Shared/Table';
import toastr from 'toastr';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [billingForm, setBillingForm] = useState<BillingForm | null>(null);
	const history = useHistory();

	const fetchBillingForm = async (id: string) => {
		try {
			const { data } = await axios.get<BillingForm>(`/billing/forms/${id}`);
			setBillingForm(data);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	// eslint-disable-next-line
	useEffect(() => {
		fetchBillingForm(match.params.id);
	}, []);

	const deleteBillingForm = async ({ id }: BillingForm) => {
		try {
			await axios.delete(`/billing/forms/${id}`);
			toastr.success('Billing Form deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete Billing Form.');
		}
	};

	const func: any = () => {};

	return (
		<div className='row'>
			{billingForm !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>{billingForm.school}</h3>
								<div className='d-flex ml-auto align-self-center'>
									<button className='btn btn-info btn-sm'>
										<i className='fas fa-file-pdf'></i> Export as PDF
									</button>
									<Link className='btn btn-warning btn-sm' to={`${window.location.pathname}/edit`}>
										{' '}
										<i className='fas fa-edit'></i> Edit
									</Link>
									<button
										type='button'
										data-toggle='modal'
										data-target={`#deleteModalBillingForm`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalBillingForm`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelBillingForm`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelBillingForm`}>
														Delete Billing Form
													</h5>
													<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>Are you sure you want to delete this Billing Form?</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalBillingForm`) as any;
															modal.on('hidden.bs.modal', () => deleteBillingForm(billingForm));
															modal.modal('hide');
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
							<p className='card-text'>{billingForm.schoolAddress}</p>
							<p className='card-text'>
								Reference Number: <b>{billingForm.referenceNumber}</b>
							</p>
							<p className='card-text'>{dayjs(billingForm.date).format('MMMM DD, YYYY')}</p>
						</div>
						<div className='card-body py-3'>
							<Table
								data={exceptMany(billingForm.rows, ['id', 'createdAt', 'updatedAt'])}
								title='Rows'
								withAction={false}
								onAddClick={func}
								onRefreshClick={func}
								onEditClick={func}
								onViewClick={func}
								processing={false}
								pagination={false}
								onDeleteConfirm={func}
							/>
						</div>
						<div className='card-footer pb-5'>
							<div className='row'>
								<div className='col-12 col-md-6'>
									<p className='card-text'>
										Prepared By: <b>{billingForm.preparedBy}</b>
									</p>
									<p className='card-text'>
										Certified By: <b>{billingForm.certifiedBy}</b>
									</p>
									<p className='card-text'>
										Certified By: <b>{billingForm.certifiedBySecond}</b>
									</p>
									<p className='card-text'>
										Approved By: <b>{billingForm.approvedBy}</b>
									</p>
								</div>
								<div className='col-12 col-md-6'>
									<p className='card-text'>
										Page Total: <b>{billingForm.pageTotal}</b>
									</p>
									<p className='card-text'>
										Page Accumulated Total: <b>{billingForm.pageAccumulatedTotal}</b>
									</p>
									<p className='card-text'>
										Total: <b>{billingForm.total}</b>
									</p>
								</div>
							</div>
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
