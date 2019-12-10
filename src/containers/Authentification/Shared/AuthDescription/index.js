import React, { useMemo } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { SignUpHint } from '../index';
import { UserCarousel } from '../../../../components';

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
      fontSize: 60,
      fontFamily: 'Ogg',
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 35
      }
    },
    description: {
      fontSize: 20,
      marginBottom: theme.spacing(2.5)
    },
    subDescription: {
      fontSize: 20
    }
  };
};

const AuthDescription = ({ classes, isCashGroup, selectedTab, groupName, signinTab }) => {

  const isSignIn = useMemo(() => selectedTab === signinTab
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [selectedTab]);

  const titleRender = () => {
    return (
      <Typography className={classes.title}>
        {
          isSignIn
            ? 'Pay it forward.'
            : isCashGroup
              ? 'Pay it forward.'
              : 'Let’s find top talent.'
        }
      </Typography>
    )
  }

  const signinRender = () => {
    if (isSignIn) {
      return (
        <Typography className={classes.description}>
          At Merit, we believe that on-the-job performance
          is the best indicator of someone's future success
          — not their resume. Ready to pay it forward to
          someone great who you have worked with?
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
                ? `On-the-job performance best predicts future success 
                — not someone’s resume. Recommend great people you have 
                worked with to showcase them to top companies.`
                : `By sharing recommendations of the best people we’ve 
                worked with, we at ${groupName || 'group'} can find great talent 
                for full-time and advisory positions. The more ${groupName || 'group'} 
                members who participate, the better!`
            }
          </Typography>
          <SignUpHint
            groupName={groupName}
            isCashGroup={isCashGroup} />
        </>
      );
    }
  }

  return (
    <div className={classes.root}>
      {titleRender()}
      {signinRender()}
      {signupRender()}
      <Typography className={classes.subDescription}>
        YOU’RE IN GOOD COMPANY
      </Typography>
      <UserCarousel />
    </div>
  );
};

AuthDescription.defaultProps = {
  signinTab: 'signin'
};

export default withStyles(styles, { withTheme: true })(AuthDescription);
