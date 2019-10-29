
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(5)}px 0`
    },
    title: {
      fontFamily: 'Moret'
    },
    subTitle: {
      fontSize: 36,
      fontFamily: 'ApercuPro-Bold'
    },
    description: {
      width: 440,
      fontSize: 18,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  };
};

const RecommendFormHeader = ({ classes }) => {
  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        REFERRAL FORM
      </Typography>
      <Typography className={classes.subTitle}>
        Time to pay it forward.
      </Typography>
      <Typography className={classes.description}>
        Just fill in the blanks. Or, if you’d rather 
        talk through this directly, don’t hesitate 
        to call <u>201-835-3111</u> .
      </Typography>
    </main>
  );
};

RecommendFormHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RecommendFormHeader);
