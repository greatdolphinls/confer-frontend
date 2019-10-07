import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavBar, Footer } from '../../components';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.mainBackColor
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  content: {
    minHeight: 'calc(100vh - 59px)'
  },
  container: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      width: 1366
    }
  }
});

const Layout = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <NavBar classes={{ toolbar: classes.container }} />
      <main className={classNames(classes.container, classes.content)}>
        <ToastContainer />
        <div className={classes.toolbar} />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
