
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 225,
      marginBottom: theme.spacing(2.5),
    },
    step: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      border: `1px solid ${theme.palette.borderColor}`,
      backgroundColor: theme.palette.mainBackColor
    },
    activeStep: {
      backgroundColor: theme.palette.subButtonColor
    },
    line: {
      width: 83,
      height: 1,
      backgroundColor: theme.palette.subButtonColor
    },
    stepButton: {
    }
  };
};

const RecommendStepper = ({ classes, minSteps, activeStep }) => {

  return (
    <div className={classes.root}>
      {[...Array(minSteps)].map((e, index) => (
        <Fragment key={index}>
          <span className={classNames(classes.step, { [classes.activeStep]: activeStep > index })} />
          {index < minSteps - 1 && <span className={classes.line} />}
        </Fragment>
      ))}
    </div >
  );
};

RecommendStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  minSteps: PropTypes.number,
  activeStep: PropTypes.number
};

RecommendStepper.defaultProps = {
  minSteps: 3,
  activeStep: 0
};

export default withStyles(styles, { withTheme: true })(RecommendStepper);
