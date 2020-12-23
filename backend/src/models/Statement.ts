import { Column, Entity, OneToMany } from 'typeorm';
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

	@OneToMany(() => StatementRow, (row) => row.statement, {
		cascade: ['remove'],
	})
	rows: Array<StatementRow>;
}
