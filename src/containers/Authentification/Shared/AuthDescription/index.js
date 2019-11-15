import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { AuthCarousel } from '../index';

const styles = theme => {
  return {
    root: {
      width: 548,
      marginTop: theme.spacing(8),
      color: theme.palette.mainForeColor,
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        width: '100%'
      }
    },
    title: {
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

  const signinRender = () => {
    if (isSignIn) {
      return (
        <Typography className={classes.description}>
          At Merit, we believe that on-the-job performance
          is the best indicator of someone's future success
          — not their alma mater. Ready to pay it forward
          and find your next great hire?
        </Typography>
      );
    }
  }

  const signupRender = () => {
    if (!isSignIn) {
      return (
        <>
          <Typography className={classes.description}>
            {
              isCashGroup
                ? `At Merit, we believe that on-the-job performance 
                is the best indicator of someone's future success 
                — not their alma mater. By creating an account, 
                you're joining other experienced and knowledgeable 
                professionals who are paying it forward to up and 
                coming talent.`
                : !!groupName
                  ? `We want to help you hire top talent through each 
                  other’s professional recommendations. Create an account 
                  to get started. After recommending three outstanding 
                  people, you’ll get access to all recommendations made 
                  by the ${groupName} community.`
                  : `We believe that on-the-job performance is the best 
                  indicator of someone's future success — not their alma 
                  mater. Sign up with your group link to pay it forward 
                  to up and coming talent and discover great people to hire.`
            }
          </Typography>
          {
            isCashGroup &&
            <Typography className={classes.description}>
              To show our gratitude, we’ll send you a gift
              card straight to your inbox. Thanks for taking
              the time!
            </Typography>
          }
        </>
      );
    }
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Join the ranks.
      </Typography>
      {signinRender()}
      {signupRender()}
      <Typography className={classes.subDescription}>
        YOU’RE IN GOOD COMPANY
      </Typography>
      <AuthCarousel />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AuthDescription);
