import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Chip } from '@material-ui/core';

import { RecommendDescription } from '../index';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    formContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: 3,
      border: `2px solid ${theme.palette.borderColor}`,
      padding: `${theme.spacing(5)}px ${theme.spacing(7)}px`,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(3),
      }
    },
    stepTag: {
      width: 156,
      fontSize: 14,
      alignSelf: 'center',
      position: 'absolute',
      top: -16,
      color: theme.palette.iconColor,
      backgroundColor: theme.palette.subBackColor2
    },
    title: {
      fontSize: 24,
      marginBottom: theme.spacing(3)
    }
  };
};

const RecommendLayout = ({ classes, selectedStep, steps, children }) => {

  const { title } = steps.find((step) => (step.number === selectedStep));

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Chip label={`Step ${selectedStep} of 2`} className={classes.stepTag} />
        <Typography className={classes.title}>
          {title}
        </Typography>
        {children}
      </div>
      <RecommendDescription />
    </div>
  );
};

RecommendLayout.propTypes = {
  steps: PropTypes.array
};

RecommendLayout.defaultProps = {
  selectedStep: 1,
  steps: [
    {
      number: 1,
      title: 'Let’s start with the basics. Who are you recommending?'
    },
    {
      number: 2,
      title: 'Now we want to hear the details so this person stands out.'
    }
  ]
};

export default withStyles(styles, { withTheme: true })(RecommendLayout);
