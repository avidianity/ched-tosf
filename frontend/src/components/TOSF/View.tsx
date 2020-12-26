import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Fee, TOSF } from '../../contracts';
import { exceptMany, handleError } from '../../helpers';
import { Table } from '../Shared/Table';
import toastr from 'toastr';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [tosf, setTOSF] = useState<TOSF | null>(null);
	const history = useHistory();

	const fetchTOSF = async (id: string) => {
		try {
			const { data } = await axios.get<TOSF>(`/tosfs/${id}`);
			setTOSF({
				...data,
				fees: await Promise.all(
					data.fees.map(async (fee) => {
						try {
							const { data } = await axios.get<Fee>(`/tosfs/fees/${fee.id}`);
							return data;
						} catch (error) {
							console.log(error);
							fee.degrees = [];
							return fee;
						}
					})
				),
			});
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	// eslint-disable-next-line
	useEffect(() => {
		fetchTOSF(match.params.id);
	}, []);

	const deleteTOSF = async ({ id }: TOSF) => {
		try {
			await axios.delete(`/tosfs/${id}`);
			toastr.success('TOSF deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete TOSF.');
		}
	};

	const func: any = () => {};

	return (
		<div className='row'>
			{tosf !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>{tosf.school}</h3>
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
										data-target={`#deleteModalTOSF`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalTOSF`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelTOSF`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelTOSF`}>
														Delete TOSF
													</h5>
													<button
														type='button'
														className='close'
														data-dismiss='modal'
														aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>
													Are you sure you want to delete this TOSF?
												</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalTOSF`) as any;
															modal.on('hidden.bs.modal', () => deleteTOSF(tosf));
															modal.modal('hide');
														}}>
														Confirm
													</button>
													<button
														type='button'
														className='btn btn-secondary btn-sm'
														data-dismiss='modal'>
														Cancel
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p className='card-text'>{tosf.address}</p>
						</div>
						<div className='card-body py-3'>
							<Table
								data={exceptMany(tosf.fees, ['id', 'createdAt', 'updatedAt', 'tosf']).map((tosf) => ({
									...tosf,
									degrees: tosf.degrees.map((degree) => degree.name).join(', '),
									dateOfApproval: dayjs(tosf.dateOfApproval).format('MMMM DD, YYYY'),
								}))}
								title='Fees'
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
							<p className='card-text'>
								Prepared By: <b>{tosf.preparedBy}</b>
							</p>
							<p className='card-text'>
								Certified By: <b>{tosf.certifiedBy}</b>
							</p>
							<p className='card-text'>
								Approved By: <b>{tosf.approvedBy}</b>
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
