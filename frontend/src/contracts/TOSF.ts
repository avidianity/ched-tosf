import { Fee } from './Fee';
import { Model } from './Model';

export interface TOSF extends Model {
	school: string;
	address: string;
	preparedBy: string;
	certifiedBy: string;
	approvedBy: string;
	fees: Array<Fee>;
}
