import { Column, Entity } from 'typeorm';
import { Model } from './Model';

@Entity()
export class Price extends Model {
	@Column()
	type: FeeTypes;

	@Column()
	name: string;

	@Column()
	amount: string;

	@Column()
	first: string;

	@Column()
	second: string;

	@Column()
	third: string;

	@Column()
	fourth: string;
}
