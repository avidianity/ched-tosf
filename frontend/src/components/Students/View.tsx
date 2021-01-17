import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Student } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import dayjs from 'dayjs';

export function View() {
	const match = useRouteMatch<{ id: string }>();
	const [student, setStudent] = useState<Student | null>(null);
	const history = useHistory();

	const fetchStudent = async (id: string) => {
		try {
			const { data } = await axios.get<Student>(`/students/${id}`);
			setStudent(data);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	useEffect(() => {
		fetchStudent(match.params.id);
		// eslint-disable-next-line
	}, []);

	const deleteStudent = async ({ id }: Student) => {
		try {
			await axios.delete(`/students/${id}`);
			toastr.success('Student deleted successfully.');
			history.goBack();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete student.');
		}
	};

	return (
		<div className='row'>
			{student !== null ? (
				<div className='col-12'>
					<div className='card'>
						<div className='card-header'>
							<div className='d-flex'>
								<h3 className='card-title align-self-center'>
									{student.firstName} {student.middleName} {student.lastName}
								</h3>
								<div className='d-flex ml-auto align-self-center'>
									<Link className='btn btn-warning btn-sm' to={`${window.location.pathname}/edit`}>
										{' '}
										<i className='fas fa-edit'></i> Edit
									</Link>
									<button
										type='button'
										data-toggle='modal'
										data-target={`#deleteModalStudent`}
										className='btn btn-danger btn-sm'>
										<i className='fas fa-trash'></i> Delete
									</button>
									<div
										className='modal fade'
										id={`deleteModalStudent`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteModalLabelStudent`}
										aria-hidden='true'>
										<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5 className='modal-title' id={`deleteModalLabelStudent`}>
														Delete Student
													</h5>
													<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
												</div>
												<div className='modal-body'>Are you sure you want to delete this Student?</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const modal = $(`#deleteModalStudent`) as any;
															modal.on('hidden.bs.modal', () => deleteStudent(student));
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
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='col-12 text-center'>
									<img src={student.photo.url} alt='Student ID' className='img-fluid' style={{ maxHeight: '200px' }} />
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Status</label>
									<p className='card-text'>{student.status}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Course</label>
									<p className='card-text'>{student.course}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Major</label>
									<p className='card-text'>{student.major}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Learner's Reference Number</label>
									<p className='card-text'>{student.lrn}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>ID Number</label>
									<p className='card-text'>{student.idNumber}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Number</label>
									<p className='card-text'>{student.number}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Email</label>
									<p className='card-text'>{student.email}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Facebook</label>
									<p className='card-text'>{student.facebook}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Address</label>
									<p className='card-text'>{student.address}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Sex</label>
									<p className='card-text'>{student.sex}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Civil Status</label>
									<p className='card-text'>{student.civilStatus}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Birthday</label>
									<p className='card-text'>{dayjs(student.birthday).format('MMMM DD, YYYY')}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Place of Birth</label>
									<p className='card-text'>{student.placeOfBirth}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Age</label>
									<p className='card-text'>{student.age}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Religion</label>
									<p className='card-text'>{student.religion}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Height</label>
									<p className='card-text'>{student.height}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Weight</label>
									<p className='card-text'>{student.weight}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Sex</label>
									<p className='card-text'>{student.sex}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Mother's Name</label>
									<p className='card-text'>{student.mothersName}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Mother's Occupation</label>
									<p className='card-text'>{student.mothersOccupation}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Father's Name</label>
									<p className='card-text'>{student.fathersName}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Father's Occupation</label>
									<p className='card-text'>{student.fathersOccupation}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Parent's Address</label>
									<p className='card-text'>{student.parentsAddress}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Parent's Number</label>
									<p className='card-text'>{student.parentsNumber}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Spouse Name</label>
									<p className='card-text'>{student.spouseName}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Spouse Occupation</label>
									<p className='card-text'>{student.spouseOccupation}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Spouse Address</label>
									<p className='card-text'>{student.spouseAddress}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Spouse Number</label>
									<p className='card-text'>{student.spouseNumber}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Elementary School Name</label>
									<p className='card-text'>{student.elementarySchoolName}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Elementary School Address</label>
									<p className='card-text'>{student.elementarySchoolAddress}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Elementary School Year Graduated</label>
									<p className='card-text'>{student.elementarySchoolYearGraduated}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Elementary School Awards</label>
									<p className='card-text'>{student.elementarySchoolAwards}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Secondary School Name</label>
									<p className='card-text'>{student.secondarySchoolName}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Secondary School Address</label>
									<p className='card-text'>{student.secondarySchoolAddress}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Secondary School Year Graduated</label>
									<p className='card-text'>{student.secondarySchoolYearGraduated}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Secondary School Awards</label>
									<p className='card-text'>{student.secondarySchoolAwards}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>College School Name</label>
									<p className='card-text'>{student.collegeSchoolName}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>College School Address</label>
									<p className='card-text'>{student.collegeSchoolAddress}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>College School Year Graduated</label>
									<p className='card-text'>{student.collegeSchoolYearGraduated}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>College School Last Attendance</label>
									<p className='card-text'>{student.collegeSchoolLastAttendance}</p>
								</div>
								<div className='col-12 col-md-4 col-lg-3'>
									<label>Talents</label>
									<p className='card-text'>{student.talents}</p>
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
