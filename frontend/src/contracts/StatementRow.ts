import { Model } from './Model';
import { Statement } from './Statement';

export interface StatementRow extends Model {
	title: string;
	description: string;
	code: string;
	amount: string;
	statement: Statement;
}
