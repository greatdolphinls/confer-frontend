import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {}
  };
};

const AdminEditUser = ({ classes }) => {
  return (
    <main className={classes.root}>
      AdminEditUser
    </main>
  );
};

AdminEditUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminEditUser);
