
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { pageLinks } from '../../constants/links'
import { roles } from '../../constants/roles';
import { hasValidToken, isEmpty, getAvatarWithName } from '../../utils/utility';
import { ProfileDropdown, MenuDropdown } from '..';
import LogoImage from '../../assets/img/logo.svg';

const styles = theme => {
  return {
    appBar: {
      boxShadow: 'unset',
      backgroundColor: theme.palette.mainBackColor,
    },
    toolbar: {},
    logoContainer: {
      marginRight: theme.spacing(2),
      cursor: 'pointer',
      flexGrow: 1,
    },
    logoImage: {
      width: 80
    },
    item: {
      borderRadius: theme.spacing(0.5),
      minWidth: 'unset',
      fontSize: 14,
      fontFamily: 'Grotesk',
      fontWeight: 'normal',
      marginLeft: theme.spacing(3),
      textTransform: 'uppercase',
      textDecoration: 'unset',
      color: theme.palette.mainForeColor,
      padding: theme.spacing(0.75),
      '&:hover': {
        backgroundColor: theme.palette.sandBackColor
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    signIn: {
      fontWeight: 'bold',
      borderRadius: 0,
      borderBottom: `2px solid ${theme.palette.buttonColor}`
    }
  };
};

const NavBar = ({
  classes, SignOffItems, AdminItems, ReferrerItems, WeakItems
}) => {
  const { user } = useSelector(state => state.auth, []);

  const homeLink = useMemo(
    () => hasValidToken() && !isEmpty(user)
      ? user.role === roles.ADMIN_ROLE
        ? pageLinks.AdminUserList.url
        : pageLinks.RecommendCount.url
      : pageLinks.StandardHome.url
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  const avatarImage = useMemo(
    () => {
      if (hasValidToken() && !isEmpty(user)) {
        if (user.isProfile) {
          return user.avatar
        } else {
          return getAvatarWithName(user.firstName, user.lastName);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  const items = useMemo(() => {
    if (hasValidToken()) {
      switch (user.role) {
        case roles.ADMIN_ROLE:
          return AdminItems;
        case roles.REFERRER_ROLE:
          return ReferrerItems;
        case roles.WEAK_ROLE:
          return WeakItems;
        default:
          return ReferrerItems;
      }
    } else {
      return SignOffItems;
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  return (
    <AppBar
      position='fixed'
      className={classes.appBar}>
      <Toolbar
        disableGutters={true}
        className={classes.toolbar}>
        <MenuDropdown
          items={items} />
        <Link
          to={homeLink}
          className={classes.logoContainer}>
          <img
            src={LogoImage}
            className={classes.logoImage}
            alt='main logo' />
        </Link>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className={classNames(classes.item, { [classes.signIn]: item.url === pageLinks.SignIn.url })}>
            {item.title}
          </Link>
        ))}
        {
          (hasValidToken() && !isEmpty(user)) &&
          <ProfileDropdown
            avatar={avatarImage} />
        }
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

NavBar.defaultProps = {
  SignOffItems: [
    {
      title: pageLinks.FAQ.title,
      url: pageLinks.FAQ.url
    },
    {
      title: pageLinks.SignIn.title,
      url: pageLinks.SignIn.url
    }
  ],
  AdminItems: [
    {
      title: pageLinks.AdminUserList.title,
      url: pageLinks.AdminUserList.url
    },
    {
      title: pageLinks.Discover.title,
      url: pageLinks.Discover.url
    },
    {
      title: pageLinks.FAQ.title,
      url: pageLinks.FAQ.url
    }
  ],
  ReferrerItems: [
    {
      title: pageLinks.Discover.title,
      url: pageLinks.Discover.url
    },
    {
      title: pageLinks.RecommendCount.title,
      url: pageLinks.RecommendCount.url
    },
    {
      title: pageLinks.FAQ.title,
      url: pageLinks.FAQ.url
    }
  ],
  WeakItems: [
    {
      title: pageLinks.RecommendCount.title,
      url: pageLinks.RecommendCount.url
    },
    {
      title: pageLinks.FAQ.title,
      url: pageLinks.FAQ.url
    }
  ]
};

export default connect()(withStyles(styles, { withTheme: true })(NavBar));
