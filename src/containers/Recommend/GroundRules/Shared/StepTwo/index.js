
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { PrimaryButton, CustomTooltip } from '../../../../../components';
import { RuleLayout } from '..';

const styles = theme => {
  return {
    root: {},
    description: {
      fontSize: 18,
      marginBottom: theme.spacing(2)
    },
    button: {
      marginTop: theme.spacing(2)
    }
  };
};

const StepTwo = ({
  classes, defaultStep, currentStep, onContinue, content, descriptions
}) => {
  const isActive = defaultStep === currentStep;
  const isSkip = defaultStep <= currentStep;

  return (
    <RuleLayout
      step={defaultStep}
      isActive={isActive}
      isSkip={isSkip}
      content={content}>
      {descriptions.map(({ description, tooltip }, index) => (
        <Typography
          key={index}
          className={classes.description}>
          {description}
          {
            !!tooltip &&
            <CustomTooltip
              placement='right-start'
              title={tooltip} />
          }
        </Typography>
      ))}
      <PrimaryButton
        onClick={onContinue}
        classes={{ root: classes.button }}>
        CONTINUE
      </PrimaryButton>
    </RuleLayout>
  );
};

StepTwo.propTypes = {
  classes: PropTypes.object.isRequired
};

StepTwo.defaultProps = {
  defaultStep: 2,
  onContinue: () => { },
  content: {
    step: 'STEP TWO',
    title: 'Recommend',
    subTitle: 'MAKE AT LEAST 3 RECOMMENDATIONS AND AWAIT OUR REVIEW'
  },
  descriptions: [
    {
      description: `Expect 5 minutes per recommendation. We’ll review 
      each one to to ensure they meet our quality standards.`
    },
    {
      description: `Since transparency drives trust, we will notify 
      the people you recommend once they are approved.You can give 
      them a heads up first!`,
      tooltip: `We disclose only your name to the people who you 
      recommend. We do not share your full recommendation. `
    }
  ]
};

export default withStyles(styles, { withTheme: true })(StepTwo);
