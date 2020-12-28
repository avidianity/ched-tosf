import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts';
import { User } from '../../contracts';
import { handleError } from '../../helpers';
import { routes } from '../../routes';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import toastr from 'toastr';

export function Register() {
	const { isLogged, setUser, setToken } = useContext(UserContext);
	const history = useHistory();
	const [processing, setProcessing] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = async () => {
		setProcessing(true);
		try {
			const {
				data: { user, token },
			} = await Axios.post<{ user: User; token: string }>('/auth/register', { email, password });
			setUser(user);
			setToken(token);
			toastr.success('Registered successfully!');
			history.push(routes.DASHBOARD);
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	if (isLogged()) {
		history.push(routes.DASHBOARD);
	}
	return (
		<div>
			<Navbar />
			<div className='main-content'>
				<div className='header bg-gradient-primary py-6 py-lg-7 pt-lg-8'>
					<div className='separator separator-bottom separator-skew zindex-100'>
						<svg x='0' y='0' viewBox='0 0 2560 100' preserveAspectRatio='none' version='1.1' xmlns='http://www.w3.org/2000/svg'>
							<polygon className='fill-default' points='2560 0 2560 100 0 100'></polygon>
						</svg>
					</div>
				</div>
				<div className='container mt--8 pb-5'>
					<div className='row justify-content-center'>
						<div className='col-lg-5 col-md-7 my-5'>
							<div className='card bg-secondary border-0 mb-0'>
								<div className='card-header bg-transparent pb-5'>
									<div className='text-muted text-center mt-2 mb-3'>
										<small>Sign up with</small>
									</div>
									<div className='btn-wrapper text-center'>
										<a
											href='/'
											onClick={(e) => e.preventDefault()}
											className={`btn btn-neutral btn-icon ${processing ? 'disabled' : ''}`}>
											<span className='btn-inner--icon'>
												<img src='/assets/img/icons/common/google.svg' alt='' />
											</span>
											<span className='btn-inner--text'>Google</span>
										</a>
									</div>
								</div>
								<div className='card-body px-lg-5 py-lg-5'>
									<div className='text-center text-muted mb-4'>
										<small>Or sign up with credentials</small>
									</div>
									<form
										onSubmit={(e) => {
											e.preventDefault();
											submit();
										}}>
										<div className='form-group mb-3'>
											<div className='input-group input-group-merge input-group-alternative'>
												<div className='input-group-prepend'>
													<span className='input-group-text'>
														<i className='ni ni-email-83'></i>
													</span>
												</div>
												<input
													className={`form-control ${processing ? 'disabled' : ''}`}
													disabled={processing}
													placeholder='Email'
													type='email'
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
										</div>
										<div className='form-group'>
											<div className='input-group input-group-merge input-group-alternative'>
												<div className='input-group-prepend'>
													<span className='input-group-text'>
														<i className='ni ni-lock-circle-open'></i>
													</span>
												</div>
												<input
													className={`form-control ${processing ? 'disabled' : ''}`}
													disabled={processing}
													placeholder='Password'
													type='password'
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</div>
										</div>
										<div className='text-center'>
											<button
												type='submit'
												className={`btn btn-primary my-4 ${processing ? 'disabled' : ''}`}
												disabled={processing}>
												{processing ? (
													<div className='flex'>
														Creating Account... <i className='fas fa-circle-notch fa-spin'></i>
													</div>
												) : (
													'Create Account'
												)}
											</button>
										</div>
									</form>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-6'>
									<a href='/forgot-password' className={`text-light ${processing ? 'disabled' : ''}`}>
										<small>Forgot password?</small>
									</a>
								</div>
								<div className='col-6 text-right'>
									<Link to={routes.LOGIN} className={`text-light ${processing ? 'disabled' : ''}`}>
										<small>Login</small>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
