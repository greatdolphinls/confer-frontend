
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { pageLinks, defaultAvatarLink } from '../../constants/links'
import { hasValidToken } from '../../utils/utility';
import { Avatar } from '../index';
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
    }
  };
};

const NavBar = ({ classes, SignOffItems, SignOnItems }) => {

  const items = hasValidToken ? SignOnItems : SignOffItems;

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
          <Button key={index} href={item.url}>
            {item.title}
          </Button>
        ))}
        {hasValidToken && <Avatar src={defaultAvatarLink} size={48} isBorder />}
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
  SignOnItems: [
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
