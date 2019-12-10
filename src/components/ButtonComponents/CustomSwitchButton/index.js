
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => {
	return {
		root: {
			color: theme.palette.buttonColor,
      padding: theme.spacing(0.5),
      width: 'fit-content',
      '& svg': {
        width: 20,
        height: 20
      }
		}
	};
};

const CustomSwitchButton = ({
	classes, flag, trueIcon, falseIcon, ...rest
}) => {

	return (
		<IconButton className={classes.root} {...rest}>
			{flag ? trueIcon : falseIcon}
		</IconButton>
	);
};

export default withStyles(styles, { withTheme: true })(CustomSwitchButton);
