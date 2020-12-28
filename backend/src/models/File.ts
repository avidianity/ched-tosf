import { Column, Entity } from 'typeorm';
import { Model } from './Model';
@Entity()
export class File extends Model {
	protected hidden = ['path'];

	@Column()
	type: string;

	@Column()
	size: number;

	@Column()
	mimeType: string;

	@Column()
	name: string;

	@Column()
	path: string;
}
