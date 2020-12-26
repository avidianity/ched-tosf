import { BillingDetailRow } from './BillingDetailRow';
import { Model } from './Model';

/**
 * Form 3 of TOSF
 */
export interface BillingDetail extends Model {
	school: string;
	schoolAddress: string;
	referenceNumber: string;
	date: Date;
	pageTotal: string;
	pageAccumulatedTotal: string;
	total: string;
	preparedBy: string;
	certifiedBy: string;
	approvedBy: string;
	rows: Array<BillingDetailRow>;
}
