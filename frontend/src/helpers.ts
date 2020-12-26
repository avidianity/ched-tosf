import toastr from 'toastr';
import _ from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function ucfirst(string: string) {
	const array = string.split('');
	array[0] = array[0].toUpperCase();
	return array.join('');
}

export function ucwords(string: string) {
	return string
		.split(' ')
		.map((word) => (word === 'Id' ? 'ID' : ucfirst(word)))
		.join(' ');
}

export function handleError(error: any) {
	if (error.response) {
		const response = error.response;
		if (response.data.message && response.status !== 422) {
			toastr.error(response.data.message);
		} else if (response.status === 422) {
			response.data.errors
				.map(({ param, msg }: any) => {
					const array = msg.split(' ');
					if (array[0].trim() !== param.trim()) {
						return `${ucfirst(sentencify(param))} ${msg}`;
					}
					return msg;
				})
				.forEach((error: any) => toastr.error(error));
		} else {
			toastr.error('Something went wrong, please try again later.', 'Oops!');
		}
	} else if (error.message) {
		toastr.error(error.message);
	}
}

export function createTableColumns(data: Array<any>) {
	if (data.length === 0) {
		return [];
	}

	return Object.keys(data[0]).map((key) => {
		switch (key) {
			case 'id':
				return 'ID';
			case 'createdAt':
				return 'Created';
			case 'updatedAt':
				return 'Modified';
			default:
				return sentencify(key);
		}
	});
}

export function sentencify(words: string) {
	return ucwords(_.snakeCase(words).split('_').join(' '));
}

export function parseDate(date: string) {
	return dayjs(date).fromNow();
}

export function makeMask<T extends Function>(callable: T, callback: Function) {
	return (((data: any) => {
		callback(data);
		return callable(data);
	}) as unknown) as T;
}

export function except<T, K extends keyof T>(data: T, keys: Array<K>) {
	for (const key of keys) {
		if (key in data) {
			delete data[key];
		}
	}
	return data;
}

export function exceptMany<T, K extends keyof T>(data: Array<T>, keys: Array<K>) {
	return data.map((item) => except(item, keys));
}
