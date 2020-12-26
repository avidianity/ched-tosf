import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Model } from './Model';
import { User } from './User';

@Entity()
export class Token extends Model {
	@Column()
	hash: string;

	@Column()
	lastUsed: Date;

	@ManyToOne(() => User, (user) => user.tokens, {
		nullable: false,
	})
	user: User;

	@BeforeInsert()
	makeDate() {
		this.lastUsed = new Date();
	}
}
