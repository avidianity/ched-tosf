import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import { FormMode, Student } from '../../contracts';
import { handleError, makeMask } from '../../helpers';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';
import { File as FileContract } from '../../contracts';
import state from '../../state';

export function Form() {
	const [mode, setMode] = useState<FormMode>('Add');
	const [id, setID] = useState<number | null>(null);
	const [data, setParentData] = useState({
		status: 'New - SHS Graduate',
		course: '',
		major: '',
		lrn: '',
		idNumber: '',
		firstName: '',
		lastName: '',
		middleName: '',
		number: '',
		email: '',
		facebook: '',
		address: '',
		sex: 'Male',
		civilStatus: '',
		birthday: '',
		placeOfBirth: '',
		age: '',
		religion: '',
		height: '',
		weight: '',
		mothersName: '',
		mothersOccupation: '',
		fathersName: '',
		fathersOccupation: '',
		parentsAddress: '',
		parentsNumber: '',
		spouseName: '',
		spouseOccupation: '',
		spouseAddress: '',
		spouseNumber: '',
		elementarySchoolName: '',
		elementarySchoolAddress: '',
		elementarySchoolYearGraduated: '',
		elementarySchoolAwards: '',
		secondarySchoolName: '',
		secondarySchoolAddress: '',
		secondarySchoolYearGraduated: '',
		secondarySchoolAwards: '',
		collegeSchoolName: '',
		collegeSchoolAddress: '',
		collegeSchoolYearGraduated: '',
		collegeSchoolLastAttendance: '',
		talents: '',
		photo: null as File | null | FileContract,
	});
	const [photoURL, setPhotoURL] = useState('https://via.placeholder.com/200');

	const setData = makeMask(setParentData, (data: any) => ({ ...data }));

	const reader = new FileReader();

	reader.onload = (event) => {
		const data = String(event.target?.result);
		setPhotoURL(data);
	};

	const ref = createRef<HTMLInputElement>();

	const [processing, setProcessing] = useState(false);

	const history = useHistory();

	const submit = async () => {
		if (processing) return;
		setProcessing(true);
		try {
			const payload = new FormData();
			Object.keys(data).forEach((key) => {
				const value = (data as any)[key];
				if (value !== null && value !== undefined) {
					payload.append(key, value);
				}
			});
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
			const { data } = await axios.get<Student>(`/students/${studentID}`);
			setID(data.id);
			setData({
				status: data.status,
				course: data.course,
				major: data.major,
				lrn: data.lrn,
				idNumber: data.idNumber,
				lastName: data.lastName,
				firstName: data.firstName,
				middleName: data.middleName,
				number: data.number,
				email: data.email,
				facebook: data.facebook,
				address: data.address,
				sex: data.sex,
				civilStatus: data.civilStatus,
				birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
				placeOfBirth: data.placeOfBirth,
				age: data.age,
				religion: data.religion,
				height: data.height,
				weight: data.weight,
				mothersName: data.mothersName,
				mothersOccupation: data.mothersOccupation,
				fathersName: data.fathersName,
				fathersOccupation: data.fathersOccupation,
				parentsAddress: data.parentsAddress,
				parentsNumber: data.parentsNumber,
				spouseName: data.spouseName,
				spouseOccupation: data.spouseOccupation,
				spouseAddress: data.spouseAddress,
				spouseNumber: data.spouseNumber,
				elementarySchoolName: data.elementarySchoolName,
				elementarySchoolAddress: data.elementarySchoolAddress,
				elementarySchoolYearGraduated: data.elementarySchoolYearGraduated,
				elementarySchoolAwards: data.elementarySchoolAwards,
				secondarySchoolName: data.secondarySchoolName,
				secondarySchoolAddress: data.secondarySchoolAddress,
				secondarySchoolYearGraduated: data.secondarySchoolYearGraduated,
				secondarySchoolAwards: data.secondarySchoolAwards,
				collegeSchoolName: data.collegeSchoolName,
				collegeSchoolAddress: data.collegeSchoolAddress,
				collegeSchoolYearGraduated: data.collegeSchoolYearGraduated,
				collegeSchoolLastAttendance: data.collegeSchoolLastAttendance,
				talents: data.talents,
				photo: null,
			});
			setPhotoURL(`${data.photo.url}?access_token=${state.get<string>('token')}`);
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	function set<K extends keyof Student>(key: K, event: React.ChangeEvent<any>) {
		(data as any)[key] = event.target.value;
		setData(data);
	}

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
						<div className='col-12 text-center p-2'>
							<label className='d-block'>Student ID Photo</label>
							<img
								src={photoURL}
								alt='Student ID'
								style={{ height: '200px', width: '200px', cursor: 'pointer' }}
								className='img-fluid rounded-circle shadow-sm border'
								onClick={() => ref.current?.click()}
							/>
							<input
								type='file'
								className='d-none'
								ref={ref}
								onChange={(e) => {
									if (e.target.files && e.target.files.length > 0) {
										const file = e.target.files.item(0);
										if (file) {
											reader.readAsDataURL(file);
											data.photo = file;
											setData(data);
										}
									}
								}}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='status'>Status:</label>
							<select
								name='status'
								id='status'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('status', e)}
								value={data.status}>
								<option value='New - SHS Graduate'>New - SHS Graduate</option>
								<option value='New - ALS Graduate'>New - ALS Graduate</option>
								<option value='Transferee'>Transferee</option>
								<option value='Re-Entry'>Re-Entry</option>
								<option value='Shiftee'>Shiftee</option>
							</select>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='lrn'>LRN:</label>
							<input
								type='text'
								name='lrn'
								id='lrn'
								placeholder='LRN'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('lrn', e)}
								value={data.lrn}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='course'>Course:</label>
							<input
								type='text'
								name='course'
								id='course'
								placeholder='Course'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('course', e)}
								value={data.course}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='major'>Major:</label>
							<input
								type='text'
								name='major'
								id='major'
								placeholder='Major'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('major', e)}
								value={data.major}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='idNumber'>ID Number:</label>
							<input
								type='text'
								name='idNumber'
								id='idNumber'
								placeholder='ID Number'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('idNumber', e)}
								value={data.idNumber}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='firstName'>First Name:</label>
							<input
								type='text'
								name='firstName'
								id='firstName'
								placeholder='First Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('firstName', e)}
								value={data.firstName}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='middleName'>Middle Name:</label>
							<input
								type='text'
								name='middleName'
								id='middleName'
								placeholder='Middle Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('middleName', e)}
								value={data.middleName}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='lastName'>Last Name:</label>
							<input
								type='text'
								name='lastName'
								id='lastName'
								placeholder='Last Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('lastName', e)}
								value={data.lastName}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='number'>Number:</label>
							<input
								type='text'
								name='number'
								id='number'
								placeholder='Number'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('number', e)}
								value={data.number}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
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
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='facebook'>Facebook:</label>
							<input
								type='text'
								name='facebook'
								id='facebook'
								placeholder='Facebook'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('facebook', e)}
								value={data.facebook}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='address'>Address:</label>
							<input
								type='text'
								name='address'
								id='address'
								placeholder='Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('address', e)}
								value={data.address}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='sex'>Sex:</label>
							<select
								name='sex'
								id='sex'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('sex', e)}
								value={data.sex}>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='civilStatus'>Civil Status:</label>
							<input
								type='text'
								name='civilStatus'
								id='civilStatus'
								placeholder='Civil Status'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('civilStatus', e)}
								value={data.civilStatus}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='birthday'>Birthday:</label>
							<input
								type='date'
								name='birthday'
								id='birthday'
								placeholder='Birthday'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('birthday', e)}
								value={data.birthday}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='placeOfBirth'>Place of Birth:</label>
							<input
								type='text'
								name='placeOfBirth'
								id='placeOfBirth'
								placeholder='Place of Birth'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('placeOfBirth', e)}
								value={data.placeOfBirth}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='age'>Age:</label>
							<input
								type='text'
								name='age'
								id='age'
								placeholder='Age'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('age', e)}
								value={data.age}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='religion'>Religion:</label>
							<input
								type='text'
								name='religion'
								id='religion'
								placeholder='Religion'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('religion', e)}
								value={data.religion}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='height'>Height:</label>
							<input
								type='text'
								name='height'
								id='height'
								placeholder='Height'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('height', e)}
								value={data.height}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='weight'>Weight:</label>
							<input
								type='text'
								name='weight'
								id='weight'
								placeholder='Weight'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('weight', e)}
								value={data.weight}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='mothersName'>Mother's Name:</label>
							<input
								type='text'
								name='mothersName'
								id='mothersName'
								placeholder="Mother's Name"
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('mothersName', e)}
								value={data.mothersName}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='mothersOccupation'>Mother's Occupation:</label>
							<input
								type='text'
								name='mothersOccupation'
								id='mothersOccupation'
								placeholder="Mother's Occupation"
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('mothersOccupation', e)}
								value={data.mothersOccupation}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='fathersName'>Father's Name:</label>
							<input
								type='text'
								name='fathersName'
								id='fathersName'
								placeholder="Father's Name"
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('fathersName', e)}
								value={data.fathersName}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='mothersOccupation'>Father's Occupation:</label>
							<input
								type='text'
								name='mothersOccupation'
								id='mothersOccupation'
								placeholder="Father's Occupation"
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('fathersOccupation', e)}
								value={data.fathersOccupation}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='parentsAddress'>Parent's Address:</label>
							<input
								type='text'
								name='parentsAddress'
								id='parentsAddress'
								placeholder="Parent's Address"
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('parentsAddress', e)}
								value={data.parentsAddress}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='parentsNumber'>Parent's Number:</label>
							<input
								type='text'
								name='parentsNumber'
								id='parentsNumber'
								placeholder="Parent's Number"
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('parentsNumber', e)}
								value={data.parentsNumber}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='spouseName'>Spouse Name:</label>
							<input
								type='text'
								name='spouseName'
								id='spouseName'
								placeholder='Spouse Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('spouseName', e)}
								value={data.spouseName}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='spouseOccupation'>Spouse Occupation:</label>
							<input
								type='text'
								name='spouseOccupation'
								id='spouseOccupation'
								placeholder='Spouse Occupation'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('spouseOccupation', e)}
								value={data.spouseOccupation}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='spouseAddress'>Spouse Address:</label>
							<input
								type='text'
								name='spouseAddress'
								id='spouseAddress'
								placeholder='Spouse Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('spouseAddress', e)}
								value={data.spouseAddress}
							/>
						</div>
						<div className='col-12 col-md-4 col-lg-3 p-2'>
							<label htmlFor='spouseNumber'>Spouse Number:</label>
							<input
								type='text'
								name='spouseNumber'
								id='spouseNumber'
								placeholder='Spouse Number'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('spouseNumber', e)}
								value={data.spouseNumber}
							/>
						</div>
						<div className='col-12'>
							<hr />
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='elementarySchoolName'>Elementary School Name:</label>
							<input
								type='text'
								name='elementarySchoolName'
								id='elementarySchoolName'
								placeholder='Elementary School Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('elementarySchoolName', e)}
								value={data.elementarySchoolName}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='elementarySchoolAddress'>Elementary School Address:</label>
							<input
								type='text'
								name='elementarySchoolAddress'
								id='elementarySchoolAddress'
								placeholder='Elementary School Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('elementarySchoolAddress', e)}
								value={data.elementarySchoolAddress}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='elementarySchoolYearGraduated'>Elementary School Year Graduated:</label>
							<input
								type='text'
								name='elementarySchoolYearGraduated'
								id='elementarySchoolYearGraduated'
								placeholder='Elementary School Year Graduated'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('elementarySchoolYearGraduated', e)}
								value={data.elementarySchoolYearGraduated}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='elementarySchoolAwards'>Elementary School Awards:</label>
							<input
								type='text'
								name='elementarySchoolAwards'
								id='elementarySchoolAwards'
								placeholder='Elementary School Awards'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('elementarySchoolAwards', e)}
								value={data.elementarySchoolAwards}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='secondarySchoolName'>Secondary School Name:</label>
							<input
								type='text'
								name='secondarySchoolName'
								id='secondarySchoolName'
								placeholder='Secondary School Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('secondarySchoolName', e)}
								value={data.secondarySchoolName}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='secondarySchoolAddress'>Secondary School Address:</label>
							<input
								type='text'
								name='secondarySchoolAddress'
								id='secondarySchoolAddress'
								placeholder='Secondary School Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('secondarySchoolAddress', e)}
								value={data.secondarySchoolAddress}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='secondarySchoolYearGraduated'>Secondary School Year Graduated:</label>
							<input
								type='text'
								name='secondarySchoolYearGraduated'
								id='secondarySchoolYearGraduated'
								placeholder='Secondary School Year Graduated'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('secondarySchoolYearGraduated', e)}
								value={data.secondarySchoolYearGraduated}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='secondarySchoolAwards'>Secondary School Awards:</label>
							<input
								type='text'
								name='secondarySchoolAwards'
								id='secondarySchoolAwards'
								placeholder='Secondary School Awards'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('secondarySchoolAwards', e)}
								value={data.secondarySchoolAwards}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='collegeSchoolName'>College School Name:</label>
							<input
								type='text'
								name='collegeSchoolName'
								id='collegeSchoolName'
								placeholder='College School Name'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('collegeSchoolName', e)}
								value={data.collegeSchoolName}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='collegeSchoolAddress'>College School Address:</label>
							<input
								type='text'
								name='collegeSchoolAddress'
								id='collegeSchoolAddress'
								placeholder='College School Address'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('collegeSchoolAddress', e)}
								value={data.collegeSchoolAddress}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='collegeSchoolYearGraduated'>College School Year Graduated:</label>
							<input
								type='text'
								name='collegeSchoolYearGraduated'
								id='collegeSchoolYearGraduated'
								placeholder='College School Year Graduated'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('collegeSchoolYearGraduated', e)}
								value={data.collegeSchoolYearGraduated}
							/>
						</div>
						<div className='col-12 col-md-4 p-2'>
							<label htmlFor='collegeSchoolLastAttendance'>College School Last Attendance:</label>
							<input
								type='text'
								name='collegeSchoolLastAttendance'
								id='collegeSchoolLastAttendance'
								placeholder='College School Last Attendance'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('collegeSchoolLastAttendance', e)}
								value={data.collegeSchoolLastAttendance}
							/>
						</div>
						<div className='col-12 p-2'>
							<label htmlFor='talents'>Talents:</label>
							<input
								type='text'
								name='talents'
								id='talents'
								placeholder='Talents'
								className={`form-control form-control-sm ${processing ? 'disabled' : ''}`}
								onChange={(e) => set('talents', e)}
								value={data.talents}
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
