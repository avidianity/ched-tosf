import { BeforeRemove, Column, Entity, OneToMany } from 'typeorm';
import { BillingDetailRow } from './BillingDetailRow';
import { Model } from './Model';

/**
 * Form 3 of TOSF
 */
@Entity()
export class BillingDetail extends Model {
	@Column()
	school: string;

	@Column()
	schoolAddress: string;

	@Column()
	referenceNumber: string;

	@Column()
	date: Date;

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
	approvedBy: string;

	@OneToMany(() => BillingDetailRow, (row) => row.detail)
	rows: Array<BillingDetailRow>;

	@BeforeRemove()
	async removeRows() {
		await BillingDetailRow.getRepository()
			.createQueryBuilder()
			.where('formId = :id', { id: this.id })
			.delete()
			.execute();
	}
}
