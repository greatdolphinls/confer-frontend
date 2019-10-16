
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => {
  return {
    root: {
      background: theme.palette.buttonColor,
    }
  };
};

const CustomChip = ({ classes, flag, labels }) => {

  if (flag) {
    return (
      <Chip
        className={classes.root}
        label={labels[0]}
        color='primary' />
    );
  } else {
    return (
      <Chip
        label={labels[1]}
        color='secondary' />
    );
  }
};

export default withStyles(styles, { withTheme: true })(CustomChip);