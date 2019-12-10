
import React, { useState, useEffect, useRef, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Reward from 'react-rewards';

import CheckCircleImage from '../../../../../assets/img/icons/progress-check.svg';
import UnCheckCircleImage from '../../../../../assets/img/icons/progress-uncheck.svg';
import ProgressStickBarImage from '../../../../../assets/img/icons/progress-stick-bar.svg';
import ProgressDotBarImage from '../../../../../assets/img/icons/progress-dot-bar.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      top: 100,
      zIndex: 1
    },
    description: {
      height: 25,
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.palette.buttonColor,
      marginBottom: theme.spacing(2)
    },
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    isNotNext: {
      opacity: 0.3
    }
  };
};

const ProfileProgressBar = ({ classes, endFetching, descriptions, stepLength, progressLength }) => {
  const [step, setStep] = useState(0);
  const reward = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < stepLength) {
        setStep(step + 1);
      }

      if (step === progressLength) {
        reward.current.rewardMe();
      }

      if (step > progressLength) {
        endFetching();
      }
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const getCircleImage = (index) => {
    const isSkip = index < step;
    const isNotNext = index > step;

    return <img
      src={isSkip ? CheckCircleImage : UnCheckCircleImage}
      alt='ProgressStep'
      className={classNames({ [classes.isNotNext]: isNotNext })} />
  }

  const getBarImage = (index) => {
    const isSkip = index + 1 < step;
    const isNotNext = index >= step;

    if (index + 1 < progressLength) {
      return <img
        src={isSkip ? ProgressStickBarImage : ProgressDotBarImage}
        alt='ProgressStep'
        className={classNames({ [classes.isNotNext]: isNotNext })} />
    }
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.description}>
        {descriptions[step]}
      </Typography>
      {
        step <= progressLength
          ? <div className={classes.container}>
            {[...Array(progressLength)].map((e, index) => {
              return (
                <Fragment key={index}>
                  {getCircleImage(index)}
                  {getBarImage(index)}
                </Fragment>
              )
            })}
          </div>
          : step === progressLength + 1 &&
          <Reward
            ref={reward}
            type='confetti'
            config={{ lifetime: 100 }}>
            <img
              src={CheckCircleImage}
              alt='CheckImage' />
          </Reward>
      }
    </main >
  );
};

ProfileProgressBar.propTypes = {
  classes: PropTypes.object.isRequired
};

ProfileProgressBar.defaultProps = {
  descriptions: [
    'Fetching data...',
    'Getting your creds in order...',
    'Finalizing the details...'
  ],
  stepLength: 5,
  progressLength: 3
};

export default withStyles(styles, { withTheme: true })(ProfileProgressBar);
