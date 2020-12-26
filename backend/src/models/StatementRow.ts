import { Column, Entity, ManyToOne } from 'typeorm';
import { Model } from './Model';
import { Statement } from './Statement';

@Entity()
export class StatementRow extends Model {
	@Column()
	title: string;

	@Column('text')
	description: string;

	@Column()
	code: string;

	@Column()
	amount: string;

	@ManyToOne(() => Statement, (statement) => statement.rows, {
		nullable: false,
	})
	statement: Statement;
}
