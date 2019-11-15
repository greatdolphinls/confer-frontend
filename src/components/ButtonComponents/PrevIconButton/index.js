
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import PrevArrowImage from '../../../assets/img/icons/prev-arrow.svg';

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

const PrevIconButton = ({ classes, ...props }) => {
  return (
    <IconButton
      className={classes.root}
      {...props}>
      <img
        alt='prevArrow'
        src={PrevArrowImage}
        className={classes.icon} />
    </IconButton>
  );
};

export default withStyles(styles, { withTheme: true })(PrevIconButton);