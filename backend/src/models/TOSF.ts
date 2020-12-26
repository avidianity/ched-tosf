import { BeforeRemove, Column, Entity, OneToMany } from 'typeorm';
import { Fee } from './Fee';
import { Model } from './Model';

@Entity()
export class TOSF extends Model {
	@Column()
	school: string;

	@Column()
	address: string;

	@Column()
	preparedBy: string;

	@Column()
	certifiedBy: string;

	@Column()
	approvedBy: string;

	@OneToMany(() => Fee, (fee) => fee.tosf, { nullable: false })
	fees: Array<Fee>;

	@BeforeRemove()
	async removefees() {
		await Fee.getRepository()
			.createQueryBuilder()
			.where('tosfId = :id', { id: this.id })
			.delete()
			.execute();
	}
}
