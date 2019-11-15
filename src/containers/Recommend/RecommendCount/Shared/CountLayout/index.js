
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import DefaultImage from '../../../../../assets/img/icons/default-recommend.svg';
import SkipLineImage from '../../../../../assets/img/icons/skip-recommend-line.svg';
import ActiveLineImage from '../../../../../assets/img/icons/active-recommend-line.svg';
import EmptyLineImage from '../../../../../assets/img/icons/empty-recommend-line.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      opacity: 0.4
    },
    stepContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    step: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      fontSize: 20,
      border: `1px solid`,
      borderRadius: '50%',
      [theme.breakpoints.down('xs')]: {
        height: 35,
        width: 35,
        fontSize: 16
      }
    },
    lineImage: {
      height: 120,
      padding: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        height: 135
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: 124,
      width: 'calc(100% - 100px)',
      marginBottom: theme.spacing(6),
      marginLeft: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 70px)',
        marginLeft: theme.spacing(3)
      }
    },
    active: {
      opacity: 1
    },
    activeStep: {
      color: theme.palette.buttonColor,
      borderColor: theme.palette.buttonColor
    },
    title: {
      fontSize: 24,
      fontFamily: 'Moret-Bold'
    },
    subTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
      }
    },
    defaultImage: {
      width: '100%',
      opacity: 0.6
    }
  };
};

const CountLayout = ({
  classes, step, isLast, isActive, isSkip, recommend
}) => {
  const getLineImage = () => {
    if (isSkip) {
      return isActive ? ActiveLineImage : SkipLineImage
    } else {
      return EmptyLineImage;
    }
  }

  return (
    <main
      className={classNames(classes.root, { [classes.active]: isSkip })}>
      <div className={classes.stepContainer}>
        <Typography
          className={classNames(classes.step, { [classes.activeStep]: isSkip })}>
          {step}
        </Typography>
        {
          !isLast &&
          <img
            alt='lineImage'
            src={getLineImage()}
            className={classes.lineImage}
          />
        }
      </div>
      <div className={classes.container}>
        {isSkip
          ? <>
            <Typography className={classes.title}>
              {`${recommend.candidate.firstName} ${recommend.candidate.lastName}`}
            </Typography>
            <Typography className={classes.subTitle}>
              {`“${recommend.whyGreat}”`}
            </Typography>
          </>
          : <img
            alt='defaultImage'
            src={DefaultImage}
            className={classes.defaultImage}
          />
        }
      </div>
    </main>
  );
};

CountLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

CountLayout.defaultProps = {
  step: 1,
  isActive: false,
  isSkip: false,
  isLast: false
};

export default withStyles(styles, { withTheme: true })(CountLayout);
