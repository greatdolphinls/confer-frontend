import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {}
  };
};

const AdminAddGroup = ({ classes }) => {
  return (
    <main className={classes.root}>
      Admin Add Group
    </main>
  );
};

AdminAddGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminAddGroup);
