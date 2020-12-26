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
	rows: Array<StatementRow>;
}
