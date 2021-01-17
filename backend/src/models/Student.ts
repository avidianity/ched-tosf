import { BeforeRemove, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { File } from './File';
import { Model } from './Model';

@Entity()
export class Student extends Model {
	@Column()
	status: string;

	@Column()
	course: string;

	@Column()
	major: string;

	@Column()
	lrn: string;

	@Column()
	idNumber: string;

	@Column()
	lastName: string;

	@Column()
	firstName: string;

	@Column()
	middleName: string;

	@Column()
	number: string;

	@Column()
	email: string;

	@Column()
	facebook: string;

	@Column()
	address: string;

	@Column()
	sex: string;

	@Column()
	civilStatus: string;

	@Column()
	birthday: string;

	@Column()
	placeOfBirth: string;

	@Column()
	age: string;

	@Column()
	religion: string;

	@Column()
	height: string;

	@Column()
	weight: string;

	@Column()
	mothersName: string;

	@Column()
	mothersOccupation: string;

	@Column()
	fathersName: string;

	@Column()
	fathersOccupation: string;

	@Column()
	parentsAddress: string;

	@Column()
	parentsNumber: string;

	@Column()
	spouseName: string;

	@Column()
	spouseOccupation: string;

	@Column()
	spouseAddress: string;

	@Column()
	spouseNumber: string;

	@Column()
	elementarySchoolName: string;

	@Column()
	elementarySchoolAddress: string;

	@Column()
	elementarySchoolYearGraduated: string;

	@Column()
	elementarySchoolAwards: string;

	@Column()
	secondarySchoolName: string;

	@Column()
	secondarySchoolAddress: string;

	@Column()
	secondarySchoolYearGraduated: string;

	@Column()
	secondarySchoolAwards: string;

	@Column({ default: 'N\\A' })
	collegeSchoolName: string;

	@Column({ default: 'N\\A' })
	collegeSchoolAddress: string;

	@Column({ default: 'N\\A' })
	collegeSchoolYearGraduated: string;

	@Column({ default: 'N\\A' })
	collegeSchoolLastAttendance: string;

	@Column({ default: 'N\\A' })
	talents: string;

	@OneToOne(() => File)
	@JoinColumn()
	photo: File;

	@BeforeRemove()
	async removePhoto() {
		await this.photo.remove();
	}
}
