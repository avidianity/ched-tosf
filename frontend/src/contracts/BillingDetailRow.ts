import { BillingDetail } from './BillingDetail';
import { Model } from './Model';

export interface BillingDetailRow extends Model {
	sequenceNumber: string;
	lastName: string;
	givenName: string;
	middleInitial: string;
	sex: string;
	birthday: string;
	degreeProgram: string;
	year: string;
	email: string;
	number: string;
	fee: string;
	remarks: string;
	detail: BillingDetail;
}
