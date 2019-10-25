import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { AuthCarousel } from '../index';

const styles = theme => {
  return {
    root: {
      width: 548,
      marginRight: theme.spacing(2),
      color: theme.palette.mainForeColor,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    title: {
      fontSize: 34,
      marginBottom: theme.spacing(2.5)
    },
    description: {
      marginBottom: theme.spacing(2.5)
    },
    subDescription: {
      fontSize: 24
    }
  };
};

const AuthDescription = ({ classes, isCashGroup, selectedTab, groupName }) => {
  const memberString = selectedTab === 'signin'
    ? 'your community' : `other ${groupName} members`;

  const cashGroupRender = () => {
    if (isCashGroup) {
      return (
        <>
          <Typography className={classes.title}>
            Give and take
          </Typography>
          <Typography className={classes.description}>
            Pay it forward and recommend oustanding people
            who you have personally worked with.
          </Typography>
          <Typography className={classes.description}>
            Why? People who have worked together truly know
            who the best people are - the salesperson who
            closed the hardest accounts, the marketer who
            designed brilliant campaigns... Help unheralded
            superstars leap out of the generic pack of
            resumes and give employers a better way to hire.
          </Typography>
          <Typography className={classes.description}>
            As you’re taking the time to recognize others,
            to express our gratitude we’ll donate $150 to
            a charity of your choosing or send you $XX so
            you can take out the people you’ve recommended
            for lunch [folllowing our review of the recommendations].
            Your choice!
          </Typography>
          <Typography className={classes.subDescription}>
            We don’t ask just anyone to recommend. Join our current members:
          </Typography>
        </>
      )
    }
  }

  const notCashGroupRender = () => {
    if (!isCashGroup) {
      return (
        <>
          <Typography className={classes.title}>
            Hire the best by paying it forward
          </Typography>
          <Typography className={classes.description}>
            Recommend three people who are the best at what they do.
            Once they’re approved, you’ll get access to all recommendations
            made by {memberString} so you can identify great talent
            and hire with confidence.
          </Typography>
          <Typography className={classes.description}>
            The purpose: People who have worked together truly know
            who the best people are -- the salesperson who closed
            the hardest accounts, the marketer who designed brilliant
            campaigns, the manager who created order from chaos, etc.
            Help these unheralded superstars stand out and give your
            community a better way to hire.
          </Typography>
          <Typography className={classes.subDescription}>
            We don’t ask just anyone to recommend. Join our current members:
          </Typography>
        </>
      )
    }
  }

  return (
    <div className={classes.root}>
      {cashGroupRender()}
      {notCashGroupRender()}
      <AuthCarousel />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AuthDescription);
