import { BeforeRemove, Column, Entity, OneToMany } from 'typeorm';
import { Model } from './Model';
import { StatementRow } from './StatementRow';

/**
 * Form 1 of TOSF
 */
@Entity()
export class Statement extends Model {
	@Column()
	school: string;

	@Column()
	schoolAddress: string;

	@Column()
	referenceNumber: string;

	@Column()
	date: string;

	@Column()
	to: string;

	@Column()
	toAddress: string;

	@Column()
	nameOne: string;

	@Column()
	positionOne: string;

	@Column()
	dateOne: string;

	@Column()
	nameTwo: string;

	@Column()
	positionTwo: string;

	@Column()
	dateTwo: string;

	@OneToMany(() => StatementRow, (row) => row.statement)
	rows: Array<StatementRow>;

	@BeforeRemove()
	async removeRows() {
		await StatementRow.getRepository().createQueryBuilder().where('statementId = :id', { id: this.id }).delete().execute();
	}
}
