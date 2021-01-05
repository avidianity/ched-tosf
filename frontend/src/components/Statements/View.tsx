import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Statement } from '../../contracts';
import { exceptMany, handleError } from '../../helpers';
import { Table } from '../Shared/Table';
import toastr from 'toastr';
import FileDownload from 'js-file-download';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [statement, setStatement] = useState<Statement | null>(null);
	const history = useHistory();

	const fetchStatement = async (id: string) => {
		try {
			const { data } = await axios.get<Statement>(`/statements/${id}`);
			setStatement(data);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const exportAsFile = async (id: number) => {
		try {
			const response = await axios.get<Blob>(`/statements/${id}/export`, { responseType: 'blob' });
			FileDownload(response.data, response.headers['x-file-name'], response.headers['Content-Type']);
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		fetchStatement(match.params.id);
		// eslint-disable-next-line
	}, []);

	const deleteStatement = async ({ id }: Statement) => {
		try {
			await axios.delete(`/statements/${id}`);
			toastr.success('Statement deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete statement.');
		}
	};

	const func: any = () => {};

	return (
		<div className='row'>
			{statement !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>{statement.school}</h3>
								<div className='d-flex ml-auto align-self-center'>
									<button
										className='btn btn-info btn-sm'
										onClick={(e) => {
											e.preventDefault();
											exportAsFile(statement.id);
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
										data-target={`#deleteModalStatement`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalStatement`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelStatement`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelStatement`}>
														Delete Statement
													</h5>
													<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>Are you sure you want to delete this Statement?</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalStatement`) as any;
															modal.on('hidden.bs.modal', () => deleteStatement(statement));
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
							<p className='card-text'>{statement.schoolAddress}</p>
							<p className='card-text'>
								Reference Number: <b>{statement.referenceNumber}</b>
							</p>
							<p className='card-text'>{dayjs(statement.date).format('MMMM D, YYYY')}</p>
							<p className='card-text'>
								To: <b>{statement.to}</b>
							</p>
							<p className='card-text'>
								To Address: <b>{statement.toAddress}</b>
							</p>
						</div>
						<div className='card-body'>
							<Table
								data={exceptMany(statement.rows, ['id', 'createdAt', 'updatedAt'])}
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
						<div className='card-footer py-5'>
							<div className='container-fluid'>
								<div className='row'>
									<div className='col-12 col-md-6'>
										<p className='card-text'>
											Name (1): <b>{statement.nameOne}</b>
										</p>
										<p className='card-text'>
											Position (1): <b>{statement.positionOne}</b>
										</p>
										<p className='card-text'>
											Date (1): <b>{dayjs(statement.dateOne).format('MMMM DD, YYYY')}</b>
										</p>
									</div>
									<div className='col-12 col-md-6'>
										<p className='card-text'>
											Name (2): <b>{statement.nameTwo}</b>
										</p>
										<p className='card-text'>
											Position (2): <b>{statement.positionTwo}</b>
										</p>
										<p className='card-text'>
											Date (2): <b>{dayjs(statement.dateTwo).format('MMMM DD, YYYY')}</b>
										</p>
									</div>
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
