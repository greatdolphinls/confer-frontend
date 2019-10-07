import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {}
  };
};

const ContactUS = ({ classes }) => {
  return (
    <main className={classes.root}>
      Contact US
    </main>
  );
};

ContactUS.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactUS);
