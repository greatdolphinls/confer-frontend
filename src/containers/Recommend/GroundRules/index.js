import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { pageLinks } from '../../../constants/links';
import { PrimaryButton } from '../../../components';
import RecommendsContent from './RecommendsContent';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: `${theme.spacing(7)}px 0`
    },
    container: {
      display: 'flex',
      maxWidth: 642,
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      }
    },
    title: {
      fontSize: 48,
      marginBottom: theme.spacing(2.5)
    },
    description: {
      fontSize: 24,
      marginBottom: theme.spacing(4.5)
    },
    rule: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: theme.spacing(4.5)
    },
    buttonContainer: {
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    button: {
      width: 275,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    buttonDescription: {
      fontSize: 10,
      textAlign: 'center'
    }
  };
};

const GroundRules = ({ classes, rules, history }) => {
  const buttonHandler = () => {
    history.push(pageLinks.RecommendForm.url);
  }

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.title}>
          First, some ground rules
        </Typography>
        <Typography className={classes.description}>
          By participating, you will be elevating people’s careers.
          The people you recommend must be people who you have personally
          worked with and can be:
        </Typography>
        {rules.map((rule, index) => (
          <Typography key={index} className={classes.rule}>
            {rule}
          </Typography>
        ))}
        <Typography className={classes.description}>
          Since transparency drives trust in the network, recommendees
          will be notified (you can give them a heads up!) and other
          recommenders can see who you conferred.
        </Typography>
        <div className={classes.buttonContainer}>
          <PrimaryButton classes={{ root: classes.button }} onClick={buttonHandler}>
            OK, I’m ready
          </PrimaryButton>
          <Typography className={classes.buttonDescription}>
            Questions? Check out our FAQ.
          </Typography>
        </div>
      </div>
      <RecommendsContent />
    </main>
  );
};

GroundRules.propTypes = {
  classes: PropTypes.object.isRequired,
  rules: PropTypes.array
};

GroundRules.defaultProps = {
  rules: [
    '1. Peers, direct reports, managers, or clients',
    '2. Current or past co-workers',
    '3. Either looking or not looking for a job currently'
  ]
};

export default withStyles(styles)(GroundRules);