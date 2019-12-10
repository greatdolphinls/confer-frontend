
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { PrimaryButton } from '../../../../../components';
import { RuleLayout, ProductSnapshot } from '..';

const styles = theme => {
  return {
    root: {},
    description: {
      fontSize: 18,
      marginBottom: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(3)
    },
    faqButton: {
      fontSize: 12,
      opacity: 0.6,
      padding: `${theme.spacing(0.5)}px 0`,
      color: theme.palette.craneForeColor,
      cursor: 'pointer'
    }
  };
};

const StepThree = ({
  classes, defaultStep, isWeak, currentStep, groupName, onContinue, onSelect, onFAQHandler, weakContent, standardContent
}) => {
  const isActive = useMemo(() => defaultStep === currentStep
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [currentStep]);
  const isSkip = useMemo(() => defaultStep <= currentStep
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [currentStep]);
  const content = useMemo(() =>
    isWeak ? weakContent : standardContent
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [isWeak]);

  const contentRender = () => {
    const { descriptions } = content;
    return (
      <>
        {
          descriptions.map((description, index) => (
            <Typography key={index} className={classes.description}>
              {description.replace('[group name]', groupName)}
            </Typography>
          ))
        }
      </>
    )
  }

  return (
    <RuleLayout
      onSelect={onSelect}
      step={defaultStep}
      isActive={isActive}
      isSkip={isSkip}
      content={content}>
      {contentRender()}
      <Typography className={classes.description}>
        Here’s what a recommendation looks like:
      </Typography>
      <ProductSnapshot />
      <PrimaryButton
        classes={{ root: classes.button }}
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
  weakContent: {
    step: 'STEP THREE',
    title: 'Thank you',
    subTitle: 'RECEIVE YOUR REWARD',
    descriptions: [
      `Your recommendations will be seen by top companies seeking 
      to fill full-time and advisory positions. To give you a sense, 
      we have managers from Google, Amex, Greenhouse and other growth 
      companies on our platform. We have a double opt-in email policy.`,
      `As a token of appreciation for your time, we’ll email your reward!`
    ]
  },
  standardContent: {
    step: 'STEP THREE',
    title: 'Discover',
    subTitle: 'MAKE YOUR NEXT HIRE',
    descriptions: [
      `You will have access to recommendations made by [group name] 
      members and the option to subscribe to all top 3 recommendations 
      in the future.`,
      `Your recommendations will also be seen by top companies seeking 
      to fill full-time and advisory positions. We have a double opt-in 
      email policy.`
    ]
  }
};

export default withStyles(styles, { withTheme: true })(StepThree);
