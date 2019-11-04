
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { PrimaryButton } from '../../../../../components';
import { RuleLayout, RecommendRules, InspirationModal } from '../';

const styles = theme => {
  return {
    root: {},
    inspiration: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.palette.craneForeColor,
      marginBottom: theme.spacing(4),
      '& span': {
        cursor: 'pointer',
        textDecoration: 'underline'
      }
    }
  };
};

const StepOne = ({
  classes, defaultStep, currentStep, onContinue, onSelect, content
}) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const isActive = defaultStep === currentStep;
  const isSkip = defaultStep <= currentStep;

  return (
    <RuleLayout
      onSelect={onSelect}
      step={defaultStep}
      isActive={isActive}
      isSkip={isSkip}
      content={content}>
      <RecommendRules />
      <Typography className={classes.inspiration}>
        {'Want some examples? See '}
        <span onClick={showModalHandler}>
          here
        </span>
      </Typography>
      <PrimaryButton
        onClick={onContinue}>
        CONTINUE
      </PrimaryButton>
      {
        showModal &&
        <InspirationModal
          opened={showModal}
          onClose={closeModalHandler}
        />
      }
    </RuleLayout>
  );
};

StepOne.propTypes = {
  classes: PropTypes.object.isRequired
};

StepOne.defaultProps = {
  defaultStep: 1,
  onContinue: () => { },
  content: {
    step: 'STEP ONE',
    title: 'Recollect',
    subTitle: 'THINK OF SOMEONE GREAT'
  }
};

export default withStyles(styles, { withTheme: true })(StepOne);
