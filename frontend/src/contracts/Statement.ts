import { Model } from './Model';
import { StatementRow } from './StatementRow';

/**
 * Form 1 of TOSF
 */
export interface Statement extends Model {
	school: string;
	schoolAddress: string;
	referenceNumber: string;
	date: string;
	to: string;
	toAddress: string;
	nameOne: string;
	positionOne: string;
	dateOne: string;
	nameTwo: string;
	positionTwo: string;
	dateTwo: string;
	rows: Array<StatementRow>;
}
