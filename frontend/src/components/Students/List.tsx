import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Student } from '../../contracts';
import { Table } from '../Shared/Table';
import toastr from 'toastr';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { onlyMany } from '../../helpers';

export function List() {
	const [students, setStudents] = useState<Array<Student>>([]);
	const [processing, setProcessing] = useState(false);
	const match = useRouteMatch();
	const history = useHistory();

	const path = (path: string) => `${match.path}${path}`;

	const fetchStudents = async () => {
		setProcessing(true);
		try {
			const { data } = await Axios.get<Array<Student>>('/students');
			setStudents(data);
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to fetch students.');
		} finally {
			setProcessing(false);
		}
	};

	const deleteStudent = async (id: number) => {
		setProcessing(true);
		try {
			await Axios.delete(`/students/${id}`);
			toastr.success('Student deleted successfully.');
			await fetchStudents();
		} catch (error) {
			console.log(error.toJSON());
			toastr.error('Unable to delete student.');
			setProcessing(false);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<Table
			title='Students'
			data={onlyMany(students, ['firstName', 'middleName', 'lastName', 'status', 'course', 'major', 'sex'])}
			processing={processing}
			onAddClick={() => history.push(path('add'))}
			onViewClick={({ id }) => {
				history.push(path(`${id}`));
			}}
			onEditClick={({ id }) => {
				history.push(path(`${id}/edit`));
			}}
			onDeleteConfirm={({ id }) => {
				deleteStudent(id);
			}}
			onRefreshClick={fetchStudents}
			withAction={true}
			pagination={true}
		/>
	);
}
