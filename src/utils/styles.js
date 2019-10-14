const commonMUITableOptions = {
	textLabels: {
		body: {
			noMatch: '',
			toolTip: 'No data'
		},
		pagination: {
			rowsPerPage: "Rows per page:",
		},
	},
	selectableRows: 'none',
	rowsPerPageOptions: [5, 10, 20, 50, 100],
	rowsPerPage: 10,
	filter: false,
	responsive: 'scrollFullHeight',
	download: false,
	viewColumns: false,
	print: false,
}

export {
	commonMUITableOptions
};
