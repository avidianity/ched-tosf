import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormMode, User } from '../../contracts';
import { handleError } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [data, setData] = useState({ email: '', password: '', role: 'Admin' });

	const [processing, setProcessing] = useState(false);

	const history = useHistory();

	const submit = async () => {
		if (processing) return;
		setProcessing(true);
		try {
			await (mode === 'Add' ? axios.post<User>('/users', data) : axios.put<User>(`/users/${id}`, data));
			toastr.success('User saved successfully.');
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	const fetchUser = async (userID: string) => {
		setMode('Edit');
		try {
			const {
				data: { email, role, id },
			} = await axios.get<User>(`/users/${userID}`);
			setID(id);
			setData({
				email,
				role,
				password: '',
			});
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const set = (key: string, event: any) => setData({ ...data, [key]: event.target.value });

	const { params, path } = useRouteMatch<{ id: string }>();

	useEffect(() => {
		if (path.includes('edit')) {
			fetchUser(params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='row pb-5'>
			<div className='col-12'>
				<h1>{mode} User</h1>
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
						<div className='col-12 p-2'>
							<label htmlFor='email'>Email:</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('email', e)}
								value={data.email}
							/>
						</div>
						<div className='col-12 p-2'>
							<label htmlFor='password'>Password:</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='Password'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('password', e)}
								value={data.password}
							/>
						</div>
						<div className='col-12 p-2'>
							<label htmlFor='role'>Role:</label>
							<select
								name='role'
								id='role'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('role', e)}
								value={data.role}>
								<option value='Admin'>Admin</option>
								<option value='Accounting'>Accounting</option>
							</select>
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
