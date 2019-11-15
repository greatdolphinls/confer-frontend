
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => {
	return {
		root: {
			color: theme.palette.buttonColor
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
