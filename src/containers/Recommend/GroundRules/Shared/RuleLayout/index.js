
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      opacity: 0.4,
      marginBottom: theme.spacing(6)
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
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing(3),
      }
    },
    active: {
      opacity: 1
    },
    activeStep: {
      color: theme.palette.buttonColor,
      borderColor: theme.palette.buttonColor
    },
    stepName: {
      fontWeight: 'bold'
    },
    title: {
      fontSize: 24,
      lineHeight: '25px',
      fontFamily: 'Moret-Bold'
    },
    subTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      width: 240
    },
    content: {
      marginTop: theme.spacing(2)
    }
  };
};

const RuleLayout = ({
  classes, step, isActive, isSkip, content, children
}) => {
  return (
    <main
      className={classNames(classes.root, { [classes.active]: isSkip })}>
      <div>
        <Typography
          className={classNames(classes.step, { [classes.activeStep]: isSkip })}>
          {step}
        </Typography>
      </div>
      <div className={classes.container}>
        <Typography className={classNames(classes.stepName, { [classes.activeStep]: isSkip })}>
          {content.step}
        </Typography>
        <Typography className={classes.title}>
          {content.title}
        </Typography>
        <Typography className={classes.subTitle}>
          {content.subTitle}
        </Typography>
        {
          isActive &&
          <div className={classes.content}>
            {children}
          </div>
        }
      </div>
    </main>
  );
};

RuleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

RuleLayout.defaultProps = {
  step: 1,
  isActive: false,
  isSkip: false
};

export default withStyles(styles, { withTheme: true })(RuleLayout);
