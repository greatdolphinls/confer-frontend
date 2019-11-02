import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';

import { GroupCarousel } from '../../../../components';
import { AuthDescription } from '../index';
import { pageLinks } from '../../../../constants/links';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
      }
    },
    paper: {
      width: 540,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(6),
      backgroundColor: theme.palette.brownBackColor,
      [theme.breakpoints.down('sm')]: {
        width: `100%`,
      }
    },
    authTabs: {
      width: '100%',
      display: 'flex',
      backgroundColor: theme.palette.lightBrownBackColor,
      justifyContent: 'space-around',
    },
    tab: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.mainForeColor,
      width: '100%',
      height: 62,
      fontSize: 14,
      opacity: 0.6,
      fontWeight: 'bold',
      textAlign: 'center',
      textDecoration: 'none',
      textTransform: 'uppercase'
    },
    selectedTab: {
      opacity: 1,
      color: theme.palette.buttonColor,
      backgroundColor: theme.palette.brownBackColor,
      '& span': {
        borderBottom: `2px solid ${theme.palette.buttonColor}`
      }
    },
    container: {
      padding: `${theme.spacing(3.5)}px ${theme.spacing(4)}px ${theme.spacing(2)}px `
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      color: theme.palette.blackBrownForeColor,
      marginBottom: theme.spacing(3)
    },
    termAndPrivacy: {
      fontSize: 12,
      opacity: 0.6,
      textAlign: 'center'
    },
    link: {
      color: theme.palette.mainForeColor
    }
  };
};

const AuthLayout = ({ classes, isCashGroup, groupName, selectedTab, tabs, children }) => {
  const isSignIn = selectedTab === 'signin';

  return (
    <Fragment>
      <div className={classes.root}>
        <AuthDescription
          isCashGroup={isCashGroup}
          selectedTab={selectedTab}
          groupName={groupName} />
        <Paper className={classes.paper}>
          <div className={classes.authTabs}>
            {tabs.map((tab) => (
              <Link
                key={tab.value}
                to={tab.url}
                className={classNames(classes.tab, { [classes.selectedTab]: selectedTab === tab.value })}>
                <span>
                  {tab.title}
                </span>
              </Link>
            ))}
          </div>
          <div className={classes.container}>
            <Typography className={classes.title}>
              {isSignIn ? 'SIGN IN WITH EMAIL' : 'SIGN UP WITH EMAIL'}
            </Typography>
            {children}
            <Typography className={classes.termAndPrivacy}>
              By creating account, you agree to our
              <Link
                to={pageLinks.TermsOfUse.url} className={classes.link}> Terms and Conditions</Link> &
              <Link to={pageLinks.PrivacyPolicy.url} className={classes.link}> Privacy Policy</Link>
            </Typography>
          </div>
        </Paper >
      </div>
      <GroupCarousel />
    </Fragment>
  );
};

AuthLayout.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  options: PropTypes.array
};

AuthLayout.defaultProps = {
  selectedTab: 'signin',
  isCashGroup: false,
  tabs: [
    {
      value: 'signin',
      title: pageLinks.SignIn.title,
      url: pageLinks.SignIn.url
    },
    {
      value: 'signup',
      title: pageLinks.SignUp.title,
      url: pageLinks.SignUp.url
    }
  ]
};

export default withStyles(styles, { withTheme: true })(AuthLayout);
