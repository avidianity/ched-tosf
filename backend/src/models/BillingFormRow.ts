import { Column, Entity, ManyToOne } from 'typeorm';
import { BillingForm } from './BillingForm';
import { Model } from './Model';

@Entity()
export class BillingFormRow extends Model {
	@Column()
	sequenceNumber: string;

	@Column()
	studentNumber: string;

	@Column()
	referenceNumber: string;

	@Column()
	lastName: string;

	@Column()
	givenName: string;

	@Column()
	middleInitial: string;

	@Column()
	degreeProgram: string;

	@Column()
	year: string;

	@Column()
	sex: string;

	@Column()
	email: string;

	@Column()
	phoneNumber: string;

	@Column()
	laboratoryUnits: string;

	@Column()
	computerLabUnits: string;

	@Column()
	unitsEnrolled: string;

	@Column()
	nstpUnitsEnrolled: string;

	@Column()
	tuitionFee: string;

	@Column()
	nstpFee: string;

	@Column()
	athleticFees: string;

	@Column()
	computerFees: string;

	@Column()
	culturalFees: string;

	@Column()
	developmentFees: string;

	@Column()
	admissionFees: string;

	@Column()
	guidanceFees: string;

	@Column()
	handbookFees: string;

	@Column()
	laboratoryFees: string;

	@Column()
	libraryFee: string;

	@Column()
	medicalFees: string;

	@Column()
	registrationFees: string;

	@Column()
	schoolIDFees: string;

	@Column()
	totalTOSF: string;

	@ManyToOne(() => BillingForm, (form) => form.rows, {
		nullable: false,
	})
	form: BillingForm;
}
