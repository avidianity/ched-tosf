import React from 'react';
import { createTableColumns, parseDate } from '../../helpers';
import pluralize from 'pluralize';

type Props = {
	title: string;
	theme?: 'light' | 'dark';
	columns?: Array<string>;
	data: Array<any>;
	onViewClick: (index: number) => void;
	onEditClick: (index: number) => void;
	onRefreshClick: () => void;
	onAddClick: () => void;
	onDeleteConfirm: (index: number) => void;
	processing: boolean;
	withAction: boolean;
	pagination: boolean;
};

export function Table({
	title,
	theme,
	columns,
	data,
	onViewClick,
	onEditClick,
	onDeleteConfirm,
	onRefreshClick,
	processing,
	onAddClick,
	withAction,
	pagination,
}: Props) {
	const headColumns = columns || createTableColumns(data);
	return (
		<div className='row'>
			<div className='col'>
				<div className='card'>
					<div className='card-header border-0'>
						<div className='d-flex'>
							<h3 className='mb-0 align-self-center'>{title}</h3>
							<div className='ml-auto align-self-center d-flex'>
								{withAction ? (
									<i
										className={`fas fa-plus clickable d-block align-self-center m-1 text-warning`}
										onClick={() => onAddClick()}></i>
								) : null}
								{withAction ? (
									<i
										className={`fas fa-redo-alt clickable d-block align-self-center m-1 text-info ${
											processing ? 'fa-spin' : ''
										}`}
										onClick={() => onRefreshClick()}></i>
								) : null}
							</div>
						</div>
					</div>
					{processing ? (
						<div className='card-body'>
							<div className='text-center'>
								<i className='fas fa-circle-notch fa-spin'></i>
							</div>
						</div>
					) : (
						<div>
							{data.length > 0 ? (
								<div className='table-responsive'>
									<table className='table table-sm align-items-center table-flush'>
										<thead className={`thead-${theme || 'light'}`}>
											<tr>
												{headColumns.map((column, index) => (
													<th
														className='sort text-center'
														data-sort={column.toLowerCase()}
														scope='col'
														key={index}>
														{column}
													</th>
												))}
												{withAction ? (
													<th scope='col' className='text-center'>
														Actions
													</th>
												) : null}
											</tr>
										</thead>
										<tbody className='list'>
											{data.map((item, index) => (
												<tr key={index}>
													{Object.entries(item).map(([key, entry], index) => (
														<td key={index} className='text-center'>
															{key === 'updatedAt' || key === 'createdAt'
																? parseDate(entry as string)
																: (entry as any)}
														</td>
													))}
													{withAction ? (
														<td className='text-center'>
															<div className='dropdown'>
																<button
																	className='btn btn-sm btn-icon-only text-light'
																	data-toggle='dropdown'
																	aria-haspopup='true'
																	aria-expanded='false'>
																	<i className='fas fa-ellipsis-v'></i>
																</button>
																<div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
																	<button className='dropdown-item' onClick={() => onViewClick(index)}>
																		<i className='ni ni-active-40 text-info'></i>
																		View
																	</button>
																	<button className='dropdown-item' onClick={() => onEditClick(index)}>
																		<i className='ni ni-ruler-pencil text-warning'></i>
																		Edit
																	</button>
																	<button
																		type='button'
																		data-toggle='modal'
																		data-target={`#deleteModal${index}`}
																		className='dropdown-item'>
																		<i className='ni ni-fat-delete text-danger'></i>
																		Delete
																	</button>
																</div>
															</div>
														</td>
													) : null}
												</tr>
											))}
										</tbody>
										{data.length >= 10 ? (
											<tfoot className={`thead-${theme || 'light'}`}>
												<tr>
													{headColumns.map((column, index) => (
														<th
															className='sort text-center'
															data-sort={column.toLowerCase()}
															scope='col'
															key={index}>
															{column}
														</th>
													))}
													{withAction ? (
														<th scope='col' className='text-center'>
															Actions
														</th>
													) : null}
												</tr>
											</tfoot>
										) : null}
									</table>
									{withAction
										? data.map((_, index) => (
												<div
													key={index}
													className='modal fade'
													id={`deleteModal${index}`}
													tabIndex={-1}
													role='dialog'
													aria-labelledby={`deleteModalLabel${index}`}
													aria-hidden='true'>
													<div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
														<div className='modal-content'>
															<div className='modal-header'>
																<h5 className='modal-title' id={`deleteModalLabel${index}`}>
																	Delete {pluralize.singular(title)}
																</h5>
																<button
																	type='button'
																	className='close'
																	data-dismiss='modal'
																	aria-label='Close'>
																	<span aria-hidden='true'>&times;</span>
																</button>
															</div>
															<div className='modal-body'>
																Are you sure you want to delete this {pluralize.singular(title)}?
															</div>
															<div className='modal-footer'>
																<button
																	type='button'
																	className='btn btn-danger btn-sm'
																	onClick={(e) => {
																		e.preventDefault();
																		const modal = $(`#deleteModal${index}`) as any;
																		modal.on('hidden.bs.modal', () => onDeleteConfirm(index));
																		modal.modal('hide');
																	}}>
																	Confirm
																</button>
																<button
																	type='button'
																	className='btn btn-secondary btn-sm'
																	data-dismiss='modal'>
																	Cancel
																</button>
															</div>
														</div>
													</div>
												</div>
										  ))
										: null}
								</div>
							) : (
								<div className='card-body'>
									<h3 className='text-center'>No Data</h3>
								</div>
							)}
						</div>
					)}

					{pagination ? (
						<div className='card-footer py-4'>
							<nav aria-label='...'>
								<ul className='pagination justify-content-end mb-0'>
									<li className='page-item disabled'>
										<a className='page-link' href='/' tabIndex={-1}>
											<i className='fas fa-angle-left'></i>
											<span className='sr-only'>Previous</span>
										</a>
									</li>
									<li className='page-item active'>
										<a className='page-link' href='/'>
											1
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='/'>
											2 <span className='sr-only'>(current)</span>
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='/'>
											3
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='/'>
											<i className='fas fa-angle-right'></i>
											<span className='sr-only'>Next</span>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
