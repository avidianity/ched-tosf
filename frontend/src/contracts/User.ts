import { Model } from './Model';

export interface User extends Model {
	email: string;
	password: string;
}
