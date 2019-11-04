import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';

import WaveArrowImage from '../../../../assets/img/icons/wave-arrow.svg';

const styles = theme => {
  return {
    root: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: theme.spacing(1),
      padding: theme.spacing(0.5),
      '& span': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }
    }
  };
};

const HomeButton = ({ classes, name, ...props }) => {
  return (
    <Button
      className={classes.root}
      {...props}>
      {name}
      <img
        src={WaveArrowImage}
        className={classes.waveArrowImage}
        alt='waveArrowImage' />
    </Button>
  );
};

HomeButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeButton);
