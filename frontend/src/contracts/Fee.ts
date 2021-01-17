import { Degree } from './Degree';
import { Model } from './Model';
import { TOSF } from './TOSF';

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
