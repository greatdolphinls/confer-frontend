import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      width: 269,
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(7),
      color: theme.palette.mainForeColor,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginLeft: 0,
        marginTop: theme.spacing(3),
      }
    },
    title: {
      fontSize: 24,
      marginBottom: theme.spacing(3)
    },
    description: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(5)
    },
    referrer: {
      marginBottom: theme.spacing(3)
    }
  };
};

const RecommendDescription = ({ classes, explains }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Stuck? Here are a few examples to get the juices flowing:
      </Typography>
      {explains.map(({ description, referrer }, index) => (
        <Fragment key={index}>
          <Typography className={classes.description}>
            {`“${description}”`}
          </Typography>
          <Typography className={classes.referrer}>
            {`-${referrer}`}
          </Typography>
        </Fragment>
      ))}
    </div>
  );
};

RecommendDescription.defaultProps = {
  explains: [
    {
      description: 'She hired and trained 3 analysts to become superstar strategy associates',
      referrer: 'Mark Gerson, co-founder GLG, about a former associate who worked on his corporate development team'
    },
    {
      description: 'Sharp, personable and client facing combined with the intelligence to back it up.',
      referrer: 'Stephen Toth, an investment banking associate at Barclays, about a former infantry officer who is now excelling in the financial industry'
    }
  ]
};

RecommendDescription.propTypes = {
  explains: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(RecommendDescription);
