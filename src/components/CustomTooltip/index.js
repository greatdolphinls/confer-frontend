
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

import TooltipImage from '../../assets/img/icons/tooltip.svg';

const styles = theme => {
  return {
    root: {},
    img: {
      width: 12,
      marginTop: -theme.spacing(0.5),
      marginLeft: theme.spacing(0.5)
    }
  };
};

const CustomTooltip = ({ classes, title, ...props }) => {

  return (
    <Tooltip
      placement='right'
      title={title}
      {...props}
    >
      <img
        src={TooltipImage}
        className={classes.img}
        alt='tooltipImage'
      />
    </Tooltip>
  );
};

export default withStyles(styles, { withTheme: true })(CustomTooltip);