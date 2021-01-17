import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { Validation } from '../helpers';
import { upload } from '../middlewares';
import { File } from '../models/File';
import { Student } from '../models/Student';

const router = Router();

router.get('/', async (_, res) => {
	return res.json(await Student.find({ relations: ['photo'] }));
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;

	const student = await Student.findOne(id, { relations: ['photo'] });

	if (!student) {
		throw new NotFoundException('Student does not exist.');
	}

	return res.json(student);
});

router.post(
	'/',
	upload.single('photo'),
	[
		body('status').notEmpty().withMessage('is required.').bail().isString(),
		body('course').notEmpty().withMessage('is required.').bail().isString(),
		body('major').notEmpty().withMessage('is required.').bail().isString(),
		body('lrn').notEmpty().withMessage('is required.').bail().isString(),
		body('idNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('lastName').notEmpty().withMessage('is required.').bail().isString(),
		body('firstName').notEmpty().withMessage('is required.').bail().isString(),
		body('middleName').notEmpty().withMessage('is required.').bail().isString(),
		body('number').notEmpty().withMessage('is required.').bail().isString(),
		body('email').notEmpty().withMessage('is required.').bail().isEmail(),
		body('facebook').notEmpty().withMessage('is required.').bail().isString(),
		body('address').notEmpty().withMessage('is required.').bail().isString(),
		body('sex').notEmpty().withMessage('is required.').bail().isString(),
		body('civilStatus').notEmpty().withMessage('is required.').bail().isString(),
		body('birthday').notEmpty().withMessage('is required.').bail().isString(),
		body('placeOfBirth').notEmpty().withMessage('is required.').bail().isString(),
		body('age').notEmpty().withMessage('is required.').bail().isString(),
		body('religion').notEmpty().withMessage('is required.').bail().isString(),
		body('height').notEmpty().withMessage('is required.').bail().isString(),
		body('weight').notEmpty().withMessage('is required.').bail().isString(),
		body('mothersName').notEmpty().withMessage('is required.').bail().isString(),
		body('mothersOccupation').notEmpty().withMessage('is required.').bail().isString(),
		body('fathersName').notEmpty().withMessage('is required.').bail().isString(),
		body('fathersOccupation').notEmpty().withMessage('is required.').bail().isString(),
		body('parentsAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('parentsNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('spouseName').notEmpty().withMessage('is required.').bail().isString(),
		body('spouseOccupation').notEmpty().withMessage('is required.').bail().isString(),
		body('spouseAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('spouseNumber').notEmpty().withMessage('is required.').bail().isString(),
		body('elementarySchoolName').notEmpty().withMessage('is required.').bail().isString(),
		body('elementarySchoolAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('elementarySchoolYearGraduated').notEmpty().withMessage('is required.').bail().isString(),
		body('elementarySchoolAwards').notEmpty().withMessage('is required.').bail().isString(),
		body('secondarySchoolName').notEmpty().withMessage('is required.').bail().isString(),
		body('secondarySchoolAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('secondarySchoolYearGraduated').notEmpty().withMessage('is required.').bail().isString(),
		body('secondarySchoolAwards').notEmpty().withMessage('is required.').bail().isString(),
		body('collegeSchoolName').notEmpty().withMessage('is required.').bail().isString(),
		body('collegeSchoolAddress').notEmpty().withMessage('is required.').bail().isString(),
		body('collegeSchoolYearGraduated').notEmpty().withMessage('is required.').bail().isString(),
		body('collegeSchoolLastAttendance').notEmpty().withMessage('is required.').bail().isString(),
		body('talents').notEmpty().withMessage('is required.').bail().isString(),
	],
	Validation.validate(),
	async (req: Request, res: Response) => {
		const data = req.body;

		if (!req.file) {
			throw new ValidationException(['Photo is required.']);
		}

		const { mimetype: mimeType, size, path, filename: name } = req.file;

		const file = await new File({
			type: 'student-id-photo',
			mimeType,
			size,
			path,
			name,
		}).save();

		const student = new Student(data);
		student.photo = file;

		return res.json(await student.save());
	}
);

function update() {
	return [
		upload.single('photo'),
		[
			body('status').optional().bail().isString(),
			body('course').optional().bail().isString(),
			body('major').optional().bail().isString(),
			body('lrn').optional().bail().isString(),
			body('idNumber').optional().bail().isString(),
			body('lastName').optional().bail().isString(),
			body('firstName').optional().bail().isString(),
			body('middleName').optional().bail().isString(),
			body('number').optional().bail().isString(),
			body('email').optional().bail().isEmail(),
			body('facebook').optional().bail().isString(),
			body('address').optional().bail().isString(),
			body('sex').optional().bail().isString(),
			body('civilStatus').optional().bail().isString(),
			body('birthday').optional().bail().isString(),
			body('placeOfBirth').optional().bail().isString(),
			body('age').optional().bail().isString(),
			body('religion').optional().bail().isString(),
			body('height').optional().bail().isString(),
			body('weight').optional().bail().isString(),
			body('mothersName').optional().bail().isString(),
			body('mothersOccupation').optional().bail().isString(),
			body('fathersName').optional().bail().isString(),
			body('fathersOccupation').optional().bail().isString(),
			body('parentsAddress').optional().bail().isString(),
			body('parentsNumber').optional().bail().isString(),
			body('spouseName').optional().bail().isString(),
			body('spouseOccupation').optional().bail().isString(),
			body('spouseAddress').optional().bail().isString(),
			body('spouseNumber').optional().bail().isString(),
			body('elementarySchoolName').optional().bail().isString(),
			body('elementarySchoolAddress').optional().bail().isString(),
			body('elementarySchoolYearGraduated').optional().bail().isString(),
			body('elementarySchoolAwards').optional().bail().isString(),
			body('secondarySchoolName').optional().bail().isString(),
			body('secondarySchoolAddress').optional().bail().isString(),
			body('secondarySchoolYearGraduated').optional().bail().isString(),
			body('secondarySchoolAwards').optional().bail().isString(),
			body('collegeSchoolName').optional().bail().isString(),
			body('collegeSchoolAddress').optional().bail().isString(),
			body('collegeSchoolYearGraduated').optional().bail().isString(),
			body('collegeSchoolLastAttendance').optional().bail().isString(),
			body('talents').optional().bail().isString(),
		],
		Validation.validate(),
		async (req: Request, res: Response) => {
			const data = req.body;

			const id = req.params.id;

			const student = await Student.findOne(id, { relations: ['photo'] });

			if (!student) {
				throw new NotFoundException('Student does not exist.');
			}

			if (req.file) {
				const old = student.photo;
				const { mimetype: mimeType, size, path, filename: name } = req.file;

				const file = await new File({
					type: 'student-id-photo',
					mimeType,
					size,
					path,
					name,
				}).save();

				await old.remove();

				student.photo = file;
			}

			return res.json(await student.forceFill(data).save());
		},
	];
}

router.put('/:id', ...update());
router.patch('/:id', ...update());

router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	const student = await Student.findOne(id, { relations: ['photo'] });

	if (!student) {
		throw new NotFoundException('Student does not exist.');
	}

	await student.remove();

	return res.sendStatus(204);
});

export const student = router;
