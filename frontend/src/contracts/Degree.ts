import { Fee } from './Fee';
import { Model } from './Model';

export interface Degree extends Model {
	name: string;
	fee: Fee;
}
