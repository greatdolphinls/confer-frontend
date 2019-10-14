import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {}
  };
};

const AdminAddUser = ({ classes }) => {
  return (
    <main className={classes.root}>
      AdminAddUser
    </main>
  );
};

AdminAddUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminAddUser);
