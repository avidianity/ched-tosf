import React, { useState } from 'react';
import { File } from '../../contracts/File';

export function Files() {
	const [files, setFiles] = useState<Array<File>>([]);
	const [processing, setProcessing] = useState(false);

	return (
		<div className='row'>
			<div className='col-12'>
				<div className='card border'>
					<div className='card-header border-0'>
						<div className='d-flex'>
							<h3 className='mb-0 align-self-center'>Files</h3>
							<div className='ml-auto align-self-center d-flex'>
								<i
									className={`fas fa-redo-alt clickable d-block align-self-center m-1 text-info ${
										processing ? 'fa-spin' : ''
									}`}
									onClick={() => {}}></i>
							</div>
						</div>
					</div>
					{/* WIP */}
				</div>
			</div>
		</div>
	);
}
