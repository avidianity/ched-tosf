import { BeforeRemove, Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Degree } from './Degree';
import { Model } from './Model';
import { TOSF } from './TOSF';

type FeeTypes =
	| 'Tuition Fees'
	| 'Athletic Fee'
	| 'Computer Fee'
	| 'Cultural Fee'
	| 'Development Fee'
	| 'Guidance Fee'
	| 'Handbook Fee'
	| 'Laboratory Fee'
	| 'Library Fee'
	| 'Medical & Dental Fee'
	| 'Registration Fee'
	| 'Admission Fee'
	| 'Entrance Fee';

@Entity()
export class Fee extends Model {
	@Column()
	type: FeeTypes;

	@ManyToMany(() => Degree, (degree) => degree.fee, {
		nullable: false,
	})
	@JoinTable()
	degrees: Array<Degree>;

	@Column()
	year: string;

	@Column()
	costPerUnit: string;

	@Column()
	coverage: string;

	@Column()
	frequencyPerAY: string;

	@Column()
	referenceNumber: string;

	@Column()
	dateOfApproval: Date;

	@Column('text')
	description: string;

	@ManyToOne(() => TOSF, (tosf) => tosf.fees, {
		nullable: false,
	})
	tosf: TOSF;

	@BeforeRemove()
	async removeDegrees() {
		this.degrees = [];
		await this.save();
	}
}
