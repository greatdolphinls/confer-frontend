
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import NextArrowImage from '../../../assets/img/icons/next-arrow.svg';

const styles = theme => {
  return {
    root: {
      color: theme.palette.buttonColor,
      width: 'fit-content'
    },
    icon: {
      width: 35,
      height: 35
    }
  };
};

const NextIconButton = ({ classes, ...props }) => {
  return (
    <IconButton
      className={classes.root}
      {...props}>
      <img
        alt='nextArrow'
        src={NextArrowImage}
        className={classes.icon} />
    </IconButton>
  );
};

export default withStyles(styles, { withTheme: true })(NextIconButton);