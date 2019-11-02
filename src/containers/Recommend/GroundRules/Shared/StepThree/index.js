
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { PrimaryButton } from '../../../../../components';
import { RuleLayout, ProductSnapshot } from '..';

const styles = theme => {
  return {
    root: {},
    description: {
      fontSize: 18,
      marginBottom: theme.spacing(1)
    },
    faqButton: {
      fontSize: 12,
      padding: `${theme.spacing(0.5)}px 0`,
      color: theme.palette.craneForeColor,
      cursor: 'pointer'
    }
  };
};

const StepThree = ({
  classes, defaultStep, isWeak, currentStep, onContinue, onFAQHandler, content
}) => {
  const isActive = defaultStep === currentStep;
  const isSkip = defaultStep <= currentStep;

  const weakContentRender = () => {
    if (isWeak) {
      return (
        <Typography className={classes.description}>
          Once your recommendations have been approved,
          we’ll send over your reward!
        </Typography>
      )
    }
  }

  const standardContentRender = () => {
    if (!isWeak) {
      return (
        <>
          <Typography className={classes.description}>
            You will have access to all recommendations
            made by your group.
          </Typography>
          <Typography className={classes.description}>
            Here’s what you can expect:
          </Typography>
          <ProductSnapshot />
        </>
      )
    }
  }

  return (
    <RuleLayout
      step={defaultStep}
      isActive={isActive}
      isSkip={isSkip}
      content={content}>
      {weakContentRender()}
      {standardContentRender()}
      <PrimaryButton
        onClick={onContinue}>
        OK, I’M READY
      </PrimaryButton>
      <Typography
        className={classes.faqButton}
        onClick={onFAQHandler}>
        Still have questions? See our FAQ
      </Typography>
    </RuleLayout>
  );
};

StepThree.propTypes = {
  classes: PropTypes.object.isRequired
};

StepThree.defaultProps = {
  isWeak: false,
  defaultStep: 3,
  onContinue: () => { },
  content: {
    step: 'STEP THREE',
    title: 'Discover',
    subTitle: 'MAKE YOUR NEXT HIRE'
  }
};

export default withStyles(styles, { withTheme: true })(StepThree);
