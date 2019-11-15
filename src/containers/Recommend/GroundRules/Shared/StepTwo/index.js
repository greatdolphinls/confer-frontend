
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
  classes, defaultStep, currentStep, onContinue, onSelect, content, descriptions
}) => {
  const isActive = defaultStep === currentStep;
  const isSkip = defaultStep <= currentStep;

  return (
    <RuleLayout
      onSelect={onSelect}
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
      description: `Expect each recommendation to take about 5 minutes.`
    },
    {
      description: `Don’t rush. We’ll review them to ensure they 
      meet our quality standards.`,
      tooltip: `We check that the recommendation meets the requirements 
      listed in Step 1, contains substantive responses, and does not 
      contain any negative remarks that would violate our policies.`
    },
    {
      description: `We will notify the people you recommend once they 
      are approved. You can give them a heads up first! We expect them 
      to be very flattered!`,
      tooltip: `We disclose only your name to them, not your full 
      recommendation. We believe that transparency is critical to 
      creating trust in the platform.`
    },
    {
      description: `Your recommendations will be seen by hiring managers 
      and other leading professionals.`
    }
  ]
};

export default withStyles(styles, { withTheme: true })(StepTwo);
