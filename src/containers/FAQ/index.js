import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {}
  };
};

const FAQ = ({ classes }) => {
  return (
    <main className={classes.root}>
      FAQ
    </main>
  );
};

FAQ.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAQ);
