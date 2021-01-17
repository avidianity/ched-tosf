import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormMode, Student } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [processing, setProcessing] = useState(false);

	const history = useHistory();

	const submit = async () => {
		if (processing) return;
		setProcessing(true);
		try {
			const payload = new FormData();
			await (mode === 'Add' ? axios.post<Student>('/students', payload) : axios.put<Student>(`/students/${id}`, payload));
			toastr.success('Student saved successfully.');
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	const fetchStudent = async (studentID: string) => {
		setMode('Edit');
		try {
			const {
				data: { id },
			} = await axios.get<Student>(`/students/${studentID}`);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const { params, path } = useRouteMatch<{ id: string }>();

	useEffect(() => {
		if (path.includes('edit')) {
			fetchStudent(params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} Student</h1>
			</div>
			<div className='col-12'>
				<hr className='mt-2 mb-3' />
			</div>
			<div className='col-12'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}>
					<div className='form-row'>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='name'>Name:</label>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								disabled={processing}
								// onChange={(e) => setName(e.target.value)}
								// value={name}
							/>
						</div>
						<div className='col-12 p-2'>
							<button type='submit' className={`btn btn-info btn-sm ${processing ? 'disabled' : ''}`} disabled={processing}>
								{processing ? (
									<div className='flex'>
										Saving... <i className='fas fa-circle-notch fa-spin'></i>
									</div>
								) : (
									'Save'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
