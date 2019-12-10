import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.mainForeColor}`,
    },
    title: {
      fontSize: 20,
      width: 540,
      textAlign: 'center',
      fontWeight: 500,
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  };
};

const CandidateLayout = ({ classes, title, children }) => {
  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.title}>
          {title}
        </Typography>
      </div>
      {children}
    </>
  );
};

CandidateLayout.propTypes = {
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(CandidateLayout);
