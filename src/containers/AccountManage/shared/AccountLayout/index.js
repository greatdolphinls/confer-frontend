import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(5)
    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      marginBottom: theme.spacing(2)
    }
  };
};

const AccountLayout = ({ classes, title, children }) => {

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

AccountLayout.propTypes = {
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(AccountLayout);
