import { Column, Entity, ManyToMany } from 'typeorm';
import { Fee } from './Fee';
import { Model } from './Model';

@Entity()
export class Degree extends Model {
	@Column({ unique: true })
	name: string;

	@ManyToMany(() => Fee, (fee) => fee.degrees, { nullable: false })
	fee: Fee;
}
