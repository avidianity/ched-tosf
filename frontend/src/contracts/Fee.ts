import { Degree } from './Degree';
import { Model } from './Model';
import { TOSF } from './TOSF';

export type FeeTypes =
	| 'Tuition Fees'
	| 'Athletic Fee'
	| 'Computer Fee'
	| 'Cultural Fee'
	| 'Development Fee'
	| 'Guidance Fee'
	| 'Handbook Fee'
	| 'Laboratory Fee'
	| 'Library Fee'
	| 'Medical & Dental Fee'
	| 'Registration Fee'
	| 'Admission Fee'
	| 'Entrance Fee';
export interface Fee extends Model {
	type: FeeTypes;
	degrees: Array<Degree>;
	year: string;
	costPerUnit: string;
	coverage: string;
	name: string;
	amount: string;
	frequencyPerAY: string;
	referenceNumber: string;
	dateOfApproval: Date;
	description: string;
	tosf: TOSF;
}
