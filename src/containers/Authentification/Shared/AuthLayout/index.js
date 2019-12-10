import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { GroupCarousel } from '../../../../components';
import { AuthDescription } from '../index';
import { pageLinks } from '../../../../constants/links';
import { isEmpty } from '../../../../utils/utility';

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
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    imageContainer: {
      height: theme.spacing(8)
    },
    groupImage: {
      width: 161,
      height: 46,
      objectFit: 'contain',
      marginBottom: theme.spacing(2)
    },
    defaultLogo: {
      height: 46,
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    paper: {
      width: '100%',
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

const AuthLayout = ({ classes, isCashGroup, groupName, groupImage, selectedTab, signinTab, tabs, children }) => {
  const isSignIn = useMemo(() => selectedTab === signinTab
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [selectedTab]);

  const groupLogoRender = () => {
    if (!isSignIn) {
      return isEmpty(groupImage) ?
        <Typography className={classes.defaultLogo}>
          Sign up with your group link
        </Typography> :
        <img
          src={groupImage}
          alt='group logo'
          className={classes.groupImage} />
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AuthDescription
          isCashGroup={isCashGroup}
          selectedTab={selectedTab}
          groupName={groupName} />
        <div className={classes.leftContainer}>
          <div className={classes.imageContainer}>
            {groupLogoRender()}
          </div>
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
              {children}
              <Typography className={classes.termAndPrivacy}>
                {'By creating account, you agree to our '}
                <Link
                  to={pageLinks.TermsOfUse.url}
                  className={classes.link}>
                  {'Terms and Conditions'}
                </Link>
                {' & '}
                <Link
                  to={pageLinks.PrivacyPolicy.url}
                  className={classes.link}>
                  {'Privacy Policy'}
                </Link>
              </Typography>
            </div>
          </Paper >
        </div>
      </div>
      <GroupCarousel />
    </>
  );
};

AuthLayout.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  options: PropTypes.array
};

AuthLayout.defaultProps = {
  selectedTab: 'signin',
  signinTab: 'signin',
  isCashGroup: false,
  groupImage: '',
  groupName: '',
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
