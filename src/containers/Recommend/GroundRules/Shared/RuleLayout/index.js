
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

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
      cursor: 'pointer',
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
        marginLeft: theme.spacing(2)
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
      fontSize: 15,
      fontWeight: 'bold'
    },
    title: {
      fontSize: 25,
      lineHeight: '35px',
      fontWeight: 'bold',
      fontFamily: 'Ogg'
    },
    subTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      width: 240
    },
    content: {
      marginTop: theme.spacing(2)
    }
  };
};

const RuleLayout = ({
  classes, step, isActive, isSkip, content, onSelect, children
}) => {
  const stepNumberHandler = () => {
    onSelect(step);
  }

  return (
    <main
      className={classNames(classes.root, { [classes.active]: isSkip })}>
      <div>
        <Typography
          onClick={stepNumberHandler}
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
