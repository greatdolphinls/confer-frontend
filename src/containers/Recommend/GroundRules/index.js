import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { pageLinks } from '../../../constants/links';
import { roles } from '../../../constants/roles';
import { StepOne, StepTwo, StepThree } from './Shared';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: `${theme.spacing(5)}px 0`
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold'
    },
    description: {
      fontSize: 18,
      width: 360,
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: 720,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  };
};

const GroundRules = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const [currentStep, setCurrentStep] = useState(1);

  const isWeak = user.role === roles.WEAK_ROLE;

  const continueButtonHandler = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      history.push(pageLinks.RecommendForm.url)
    }
  }

  const pageLinkHandler = (url) => () => {
    history.push(url);
  }

  const description = `It’s simple: recommend three people, then 
    ${isWeak ? 'unlock your reward' : 'access your group’s recommendations'}.`

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        How It Works
      </Typography>
      <Typography className={classes.description}>
        {description}
      </Typography>
      <div className={classes.container}>
        <StepOne
          currentStep={currentStep}
          onContinue={continueButtonHandler} />
        <StepTwo
          currentStep={currentStep}
          onContinue={continueButtonHandler} />
        <StepThree
          isWeak={isWeak}
          currentStep={currentStep}
          onContinue={continueButtonHandler}
          onFAQHandler={pageLinkHandler(pageLinks.FAQ.url)} />
      </div>
    </main>
  );
};

GroundRules.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroundRules);