import { Router } from 'express';
import { BillingDetail } from '../models/BillingDetail';
import { BillingForm } from '../models/BillingForm';
import { Statement } from '../models/Statement';
import { TOSF } from '../models/TOSF';
import 'express-async-errors';

const router = Router();

router.get('/', async (_req, res) => {
	return res.json({
		statements: await Statement.count(),
		tosfs: await TOSF.count(),
		billingForms: await BillingForm.count(),
		billingDetails: await BillingDetail.count(),
	});
});

export const count = router;
