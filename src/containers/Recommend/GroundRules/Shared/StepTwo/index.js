
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

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
  classes, defaultStep, isWeak, currentStep, onContinue, onSelect, weakContent, standardContent, descriptions
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
  isWeak: false,
  defaultStep: 2,
  onContinue: () => { },
  weakContent: {
    step: 'STEP TWO',
    title: 'Recommend',
    subTitle: 'MAKE UP TO 5 RECOMMENDATIONS AND AWAIT OUR REVIEW'
  },
  standardContent: {
    step: 'STEP TWO',
    title: 'Recommend',
    subTitle: 'MAKE AT LEAST 3 RECOMMENDATIONS AND AWAIT OUR REVIEW'
  },
  descriptions: [
    {
      description: `Expect each recommendation to take about 5 minutes. 
      We’ll review them to ensure they meet our quality standards.`,
      tooltip: `We check that the recommendation meets the requirements 
      listed in Step 1, contains substantive responses, and does not 
      contain any negative remarks that would violate our policies.`
    },
    {
      description: `We’ll invite the people you recommend to sign up 
      and see your recommendation – expect them to be very flattered! 
      We wait at least 24 hours to email them so you can give them a 
      heads up first!`,
      tooltip: `We disclose your recommendation to them as we believe 
      that transparency is critical to creating trust in the platform. 
      You can use the opportunity to reconnect with former colleagues!`
    }
  ]
};

export default withStyles(styles, { withTheme: true })(StepTwo);
