import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { User } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import dayjs from 'dayjs';
import state from '../../state';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [user, setUser] = useState<User | null>(null);
	const history = useHistory();

	const fetchUser = async (id: string) => {
		try {
			const { data } = await axios.get<User>(`/users/${id}`);
			setUser(data);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	useEffect(() => {
		fetchUser(match.params.id);
		// eslint-disable-next-line
	}, []);

	const deleteUser = async ({ id }: User) => {
		try {
			await axios.delete(`/users/${id}`);
			toastr.success('User deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete user.');
		}
	};

	return (
		<div className='row'>
			{user !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>View User</h3>
								<div className='d-flex ml-auto align-self-center'>
									<Link className='btn btn-warning btn-sm' to={`${window.location.pathname}/edit`}>
										{' '}
										<i className='fas fa-edit'></i> Edit
									</Link>
									<button
										type='button'
										data-toggle='modal'
										data-target={`#deleteModalUser`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalUser`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelUser`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelUser`}>
														Delete User
													</h5>
													<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>Are you sure you want to delete this User?</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalUser`) as any;
															modal.modal('hide');
															deleteUser(user);
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
							<div className='row'>
								<div className='col-12 col-md-4'>
									<label>Status</label>
									<p className='card-text'>{user.email}</p>
								</div>
								<div className='col-12 col-md-4'>
									<label>Role</label>
									<p className='card-text'>{user.role}</p>
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
