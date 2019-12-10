
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MUIDataTable from 'mui-datatables';

const styles = theme => {
    return {
        root: {
            padding: `0 ${theme.spacing(3)}px`,
            backgroundColor: theme.palette.mainBackColor,
            '& th': {
                fontSize: 14,
                backgroundColor: theme.palette.mainBackColor,
                padding: theme.spacing(2)
            },
            '& td': {
                padding: `0 ${theme.spacing(2)}px`,
            }
        }
    }
};

const CustomMUIDataTable = ({ classes, ...rest }) => {
    return (
        <MUIDataTable
            className={classes.root}
            {...rest} />
    );
};

export default withStyles(styles, { withTheme: true })(CustomMUIDataTable);
