import { BeforeRemove, Column, Entity } from 'typeorm';
import { Model } from './Model';
import fs from 'fs';

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

	toJSON() {
		const data = super.toJSON();

		data.available = fs.existsSync(this.path);

		return data;
	}

	@BeforeRemove()
	removeFile() {
		if (fs.existsSync(this.path)) {
			fs.unlinkSync(this.path);
		}
	}
}
