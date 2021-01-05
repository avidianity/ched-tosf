import { BillingForm } from './BillingForm';
import { Model } from './Model';

export interface BillingFormRow extends Model {
	sequenceNumber: string;
	studentNumber: string;
	referenceNumber: string;
	lastName: string;
	givenName: string;
	middleInitial: string;
	degreeProgram: string;
	year: string;
	sex: string;
	email: string;
	phoneNumber: string;
	laboratoryUnits: string;
	computerLabUnits: string;
	unitsEnrolled: string;
	nstpUnitsEnrolled: string;
	tuitionFee: string;
	nstpFee: string;
	athleticFees: string;
	computerFees: string;
	culturalFees: string;
	developmentFees: string;
	admissionFees: string;
	guidanceFees: string;
	handbookFees: string;
	laboratoryFees: string;
	libraryFee: string;
	medicalFees: string;
	registrationFees: string;
	schoolIDFees: string;
	totalTOSF: string;
	form: BillingForm;
}
