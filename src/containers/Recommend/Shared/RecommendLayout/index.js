import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Chip } from '@material-ui/core';

import { pageLinks } from '../../../../constants/links';
import { BackButton } from '../../../../components';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(5),
    },
    formContainer: {
      width: 780,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: 3,
      border: `2px solid ${theme.palette.borderColor}`,
      padding: `${theme.spacing(5)}px ${theme.spacing(7)}px ${theme.spacing(2.5)}px`,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: `${theme.spacing(7)}px ${theme.spacing(3)}px ${theme.spacing(2.5)}px`,
      }
    },
    back: {
      left: 5,
      top: 5,
      display: 'flex',
      position: 'absolute'
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
      marginBottom: theme.spacing(1)
    }
  };
};

const RecommendLayout = ({ classes, selectedStep, steps, onSetStep, history, children }) => {
  const { title, back } = steps.find((step) => (step.number === selectedStep));

  const backHandler = () => {
    if (selectedStep === 1) {
      history.push(pageLinks.GroundRules.url);
    } else {
      onSetStep(1);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <BackButton
          label={back}
          onBack={backHandler}
          classes={{ root: classes.back }}
        />
        <Chip
          label={`Step ${selectedStep} of 2`}
          className={classes.stepTag} />
        <Typography className={classes.title}>
          {title}
        </Typography>
        {children}
      </div>
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
      title: 'Let’s start with the basics. Who are you recommending?',
      back: 'see how to recommend'
    },
    {
      number: 2,
      title: 'Now we want to hear the details so this person stands out.',
      back: 'back'
    }
  ]
};

export default withStyles(styles, { withTheme: true })(RecommendLayout);
