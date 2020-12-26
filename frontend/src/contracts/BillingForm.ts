import { BillingFormRow } from './BillingFormRow';
import { Model } from './Model';

/**
 * Form 2 of TOSF
 */
export interface BillingForm extends Model {
	school: string;
	schoolAddress: string;
	referenceNumber: string;
	date: string;
	pageTotal: string;
	pageAccumulatedTotal: string;
	total: string;
	preparedBy: string;
	certifiedBy: string;
	certifiedBySecond: string;
	approvedBy: string;
	rows: Array<BillingFormRow>;
}
