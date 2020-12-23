import { Column, Entity, OneToMany } from 'typeorm';
import { Model } from './Model';
import { Token } from './Token';

@Entity()
export class User extends Model {
	protected hidden = ['password'];

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Token, (token) => token.user, { cascade: ['remove'] })
	tokens: Array<Token>;
}
