import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { AuthCarousel } from '../index';

const styles = theme => {
  return {
    root: {
      width: 548,
      color: theme.palette.mainForeColor,
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        width: '100%'
      }
    },
    title: {
      fontSize: 22,
      fontFamily: 'Moret-Bold'
    },
    subTitle: {
      fontSize: 42,
      fontWeight: 'bold',
      marginBottom: theme.spacing(1.5)
    },
    description: {
      marginBottom: theme.spacing(2.5)
    },
    subDescription: {
      fontSize: 22,
      fontFamily: 'Moret-Bold'
    }
  };
};

const AuthDescription = ({ classes, isCashGroup, selectedTab, groupName }) => {

  const isSignIn = selectedTab === 'signin';

  const signupRender = () => {
    if (!isSignIn) {
      return (
        <Typography className={classes.description}>
          {
            isCashGroup
              ? `To show our gratitude, we’ll send you a gift
               card straight to your inbox. Thanks for taking 
               the time!`
              : `Plus, as a recommender, you’ll get access to a 
              curated group of professionals so you can hire with 
              confidence.`
          }
        </Typography>
      );
    }
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {
          isSignIn
            ? 'SIGN IN'
            : 'SIGN UP FOR AN ACCOUNT'
        }
      </Typography>
      <Typography className={classes.subTitle}>
        Join the ranks.
      </Typography>
      <Typography className={classes.description}>
        {
          isSignIn
            ? `At Merit, we believe that on-the-job performance 
            is the best indicator of someone's future success 
            — not their alma mater. Continue paying it forward 
            to up and coming talent and discovering great people 
            to hire.`
            : `At Merit, we believe that on-the-job performance 
            is the best indicator of someone's future success 
            — not their alma mater. By creating an account, 
            you're joining other experienced and knowledgeable 
            professionals who are paying it forward to up and 
            coming talent.`
        }
      </Typography>
      {signupRender()}
      <Typography className={classes.subDescription}>
        YOU’RE IN GOOD COMPANY
      </Typography>
      <AuthCarousel />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AuthDescription);
