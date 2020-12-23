import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Model extends BaseEntity {
	protected hidden: Array<string> = [];
	protected fillable: Array<string> = [];

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;

	constructor(data?: any) {
		super();

		if (data) {
			this.forceFill(data);
		}
	}

	toJSON() {
		const data = { ...this } as any;
		for (const key of this.hidden) {
			delete data[key];
		}
		delete data.hidden;
		delete data.fillable;
		return data;
	}

	fill(data: Partial<this>) {
		const fillable = this.fillable;
		for (const key in data) {
			if (fillable.includes(key)) {
				this[key] = <any>data[key];
			}
		}
		return this;
	}

	forceFill(data: Partial<this>) {
		for (const key in data) {
			this[key] = <any>data[key];
		}
		return this;
	}

	@BeforeInsert()
	beforeInserting() {
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	beforeUpdating() {
		this.updatedAt = new Date();
	}
}
