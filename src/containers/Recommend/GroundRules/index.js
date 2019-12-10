import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { pageLinks } from '../../../constants/links';
import { roles } from '../../../constants/roles';
import { StepOne, StepTwo, StepThree } from './Shared';
import GroupImage from '../../../assets/img/defaultLogo.jpg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: `${theme.spacing(5)}px 0`
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold'
    },
    description: {
      fontSize: 20,
      width: 490,
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
    },
    groupImage: {
      width: 161,
      height: 46,
      objectFit: 'contain',
      marginBottom: theme.spacing(2)
    }
  };
};

const GroundRules = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const [currentStep, setCurrentStep] = useState(1);

  const isWeak = useMemo(
    () => user.role === roles.WEAK_ROLE
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  const groupImage = useMemo(
    () => user.groupObjects[0].logo || GroupImage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  const groupName = useMemo(
    () => {
      let text = '';
      user.groupObjects.map(({ name }, index) => {
        if (index !== 0) {
          text += ', ';
        }
        text += name;
        return null;
      });
      return text;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  const continueButtonHandler = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      history.push(pageLinks.RecommendForm.url)
    }
  }

  const selectStepHandler = stepNumber => {
    setCurrentStep(stepNumber);
  }

  const pageLinkHandler = (url) => () => {
    history.push(url);
  }

  const description = `It’s simple: recommend someone great, then
  ${isWeak ?
      'unlock your reward' :
      'get access to all professionals recommended by other [group name] members'.replace('[group name]', groupName)}.`

  return (
    <main className={classes.root}>
      {
        !isWeak &&
        <img
          src={groupImage}
          alt='groupLogo'
          className={classes.groupImage} />
      }
      <Typography className={classes.title}>
        How It Works
      </Typography>
      <Typography className={classes.description}>
        {description}
      </Typography>
      <div className={classes.container}>
        <StepOne
          currentStep={currentStep}
          onSelect={selectStepHandler}
          onContinue={continueButtonHandler} />
        <StepTwo
          isWeak={isWeak}
          currentStep={currentStep}
          onSelect={selectStepHandler}
          onContinue={continueButtonHandler} />
        <StepThree
          isWeak={isWeak}
          groupName={groupName}
          currentStep={currentStep}
          onSelect={selectStepHandler}
          onContinue={continueButtonHandler}
          onFAQHandler={pageLinkHandler(pageLinks.FAQ.url)} />
      </div>
    </main >
  );
};

GroundRules.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroundRules);