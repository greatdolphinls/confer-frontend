
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { pageLinks, defaultAvatarLink } from '../../constants/links'
import roles from '../../constants/roles';
import { hasValidToken } from '../../utils/utility';
import { Avatar } from '../index';
import { logoutUser } from '../../actions';
import LogoImage from '../../assets/img/logo.png';

const styles = theme => {
  return {
    appBar: {
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
      width: 106,
      margin: `0 ${theme.spacing(3)}`,
      fontSize: 14,
      fontWeight: 'normal',
      opacity: 0.6
    }
  };
};

const NavBar = ({ classes, SignOffItems, AdminItems, ReferrerItems }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth, []);
  let items = [];

  if (hasValidToken()) {
    switch (user.role) {
      case roles.ADMIN_ROLE:
        items = AdminItems;
        break;
      case roles.REFERRER_ROLE:
        items = ReferrerItems;
        break;
      default:
        items = ReferrerItems;
        break;
    }
  } else {
    items = SignOffItems;
  }

  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  return (
    <AppBar
      position='fixed'
      className={classes.appBar}>
      <Toolbar
        disableGutters={true}
        className={classes.toolbar}>
        <Link
          to={'/'}
          className={classes.logoContainer}>
          <img
            src={LogoImage}
            className={classes.logoImage}
            alt='main logo' />
        </Link>
        {items.map((item, index) => (
          <Button
            key={index}
            href={item.url}
            className={classes.item}>
            {item.title}
          </Button>
        ))}
        {
          (hasValidToken && !!user) &&
          <div onClick={logoutHandler}>
            <Avatar
              src={user.avatar || defaultAvatarLink}
              size={48}
              isBorder
              onClick={logoutHandler}
            />
          </div>
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
  ]
};

export default connect()(withStyles(styles, { withTheme: true })(NavBar));
