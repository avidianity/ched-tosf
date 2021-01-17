import { Model } from './Model';

export interface Price extends Model {
	type: FeeTypes;
	name: string;
	amount: string;
	first: string;
	second: string;
	third: string;
	fourth: string;
}
