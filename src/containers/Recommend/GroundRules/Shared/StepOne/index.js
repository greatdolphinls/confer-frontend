
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { PrimaryButton } from '../../../../../components';
import { RuleLayout, RecommendRules, InspirationModal } from '../';

const styles = theme => {
  return {
    root: {},
    inspiration: {
      fontSize: 15,
      color: theme.palette.craneForeColor,
      marginBottom: theme.spacing(4),
      '& span': {
        fontWeight: 'bold',
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

  const isActive = useMemo(() => defaultStep === currentStep
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [currentStep]);

  const isSkip = useMemo(() => defaultStep <= currentStep
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [currentStep]);

  const showModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

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
