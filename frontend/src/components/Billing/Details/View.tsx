import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { BillingDetail } from '../../../contracts';
import { exceptMany, handleError } from '../../../helpers';
import { Table } from '../../Shared/Table';
import toastr from 'toastr';
import FileDownload from 'js-file-download';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [billingDetail, setBillingDetail] = useState<BillingDetail | null>(null);
	const history = useHistory();

	const fetchBillingDetail = async (id: string) => {
		try {
			const { data } = await axios.get<BillingDetail>(`/billing/details/${id}`);
			setBillingDetail(data);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const exportAsFile = async (id: number) => {
		try {
			const response = await axios.get<Blob>(`/billing/details/${id}/export`, { responseType: 'blob' });
			FileDownload(response.data, response.headers['x-file-name'], response.headers['Content-Type']);
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		fetchBillingDetail(match.params.id);
		// eslint-disable-next-line
	}, []);

	const deleteBillingDetail = async ({ id }: BillingDetail) => {
		try {
			await axios.delete(`/billing/details/${id}`);
			toastr.success('Billing Detail deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete Billing Detail.');
		}
	};

	const func: any = () => {};

	return (
		<div className='row'>
			{billingDetail !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>{billingDetail.school}</h3>
								<div className='d-flex ml-auto align-self-center'>
									<button
										className='btn btn-info btn-sm'
										onClick={(e) => {
											e.preventDefault();
											exportAsFile(billingDetail.id);
										}}>
										<i className='fas fa-file-word'></i> Export as DOCX
									</button>
									<Link className='btn btn-warning btn-sm' to={`${window.location.pathname}/edit`}>
										{' '}
										<i className='fas fa-edit'></i> Edit
									</Link>
									<button
										type='button'
										data-toggle='modal'
										data-target={`#deleteModalBillingDetail`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalBillingDetail`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelBillingDetail`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelBillingDetail`}>
														Delete Billing Detail
													</h5>
													<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>Are you sure you want to delete this Billing Detail?</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalBillingDetail`) as any;
															modal.on('hidden.bs.modal', () => deleteBillingDetail(billingDetail));
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
							<p className='card-text'>{billingDetail.schoolAddress}</p>
							<p className='card-text'>
								Reference Number: <b>{billingDetail.referenceNumber}</b>
							</p>
							<p className='card-text'>{dayjs(billingDetail.date).format('MMMM DD, YYYY')}</p>
						</div>
						<div className='card-body py-3'>
							<Table
								data={exceptMany(billingDetail.rows, ['id', 'createdAt', 'updatedAt']).map((row) => ({
									...row,
									birthday: dayjs(row.birthday).format('MMMM DD, YYYY'),
								}))}
								title='Rows'
								withAction={false}
								onAddClick={func}
								onRefreshClick={func}
								onEditClick={func}
								onViewClick={func}
								processing={false}
								pagination={false}
								onDeleteConfirm={func}
								border={true}
							/>
						</div>
						<div className='card-footer pb-5'>
							<div className='row'>
								<div className='col-12 col-md-6'>
									<p className='card-text'>
										Prepared By: <b>{billingDetail.preparedBy}</b>
									</p>
									<p className='card-text'>
										Certified By: <b>{billingDetail.certifiedBy}</b>
									</p>
									<p className='card-text'>
										Approved By: <b>{billingDetail.approvedBy}</b>
									</p>
								</div>
								<div className='col-12 col-md-6'>
									<p className='card-text'>
										Page Total: <b>{billingDetail.pageTotal}</b>
									</p>
									<p className='card-text'>
										Page Accumulated Total: <b>{billingDetail.pageAccumulatedTotal}</b>
									</p>
									<p className='card-text'>
										Total: <b>{billingDetail.total}</b>
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
