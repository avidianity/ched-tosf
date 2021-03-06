import { BeforeRemove, Column, Entity, OneToMany } from 'typeorm';
import { BillingFormRow } from './BillingFormRow';
import { Model } from './Model';

/**
 * Form 2 of TOSF
 */
@Entity()
export class BillingForm extends Model {
	@Column()
	school: string;

	@Column()
	schoolAddress: string;

	@Column()
	referenceNumber: string;

	@Column()
	date: string;

	@Column()
	pageTotal: string;

	@Column()
	pageAccumulatedTotal: string;

	@Column()
	total: string;

	@Column()
	preparedBy: string;

	@Column()
	certifiedBy: string;

	@Column()
	certifiedBySecond: string;

	@Column()
	approvedBy: string;

	@OneToMany(() => BillingFormRow, (row) => row.form)
	rows: Array<BillingFormRow>;

	@BeforeRemove()
	async removeRows() {
		await BillingFormRow.getRepository()
			.createQueryBuilder()
			.where('formId = :id', { id: this.id })
			.delete()
			.execute();
	}
}
