import { Column, Entity, ManyToOne } from 'typeorm';
import { BillingDetail } from './BillingDetail';
import { Model } from './Model';

@Entity()
export class BillingDetailRow extends Model {
	@Column()
	sequenceNumber: string;

	@Column()
	lastName: string;

	@Column()
	givenName: string;

	@Column()
	middleInitial: string;

	@Column()
	sex: string;

	@Column()
	birthday: Date;

	@Column()
	degreeProgram: string;

	@Column()
	year: string;

	@Column()
	email: string;

	@Column()
	number: string;

	@Column()
	fee: string;

	@Column()
	remarks: string;

	@ManyToOne(() => BillingDetail, (detail) => detail.rows, {
		nullable: false,
	})
	detail: BillingDetail;
}
