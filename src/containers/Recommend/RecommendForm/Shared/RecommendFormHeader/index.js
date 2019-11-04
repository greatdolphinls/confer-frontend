
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
      width: 660,
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  };
};

const RecommendFormHeader = ({ classes }) => {
  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        RECOMMENDATION FORM
      </Typography>
      <Typography className={classes.subTitle}>
        Time to pay it forward.
      </Typography>
      <Typography className={classes.description}>
        Just fill in the blanks. Or, if you’d rather
        talk through this directly, give us a call
        at <u>646-389-5352</u>.
      </Typography>
    </main>
  );
};

RecommendFormHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RecommendFormHeader);
