import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {}
  };
};

const TermsOfUse = ({ classes }) => {
  return (
    <main className={classes.root}>
      Terms Of Use
    </main>
  );
};

TermsOfUse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TermsOfUse);
