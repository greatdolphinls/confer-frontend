
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      height: 24,
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'uppercase',
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: theme.palette.yellowBackColor
    }
  };
};

const GroupItem = ({ classes, name }) => {

  return (
    <Chip
      label={name}
      className={classes.root} />
  );
};

export default withStyles(styles, { withTheme: true })(GroupItem);
