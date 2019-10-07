import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { CandidateInfo, BoxLayout } from '../../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: `${theme.spacing(6)}px 0`,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    title: {
      position: 'inherit',
      fontSize: 10,
      marginBottom: theme.spacing(1)
    },
    firstBox: {
      position: 'inherit',
      left: 150,
      width: 600
    },
    secondBox: {
      position: 'inherit',
      margin: theme.spacing(6),
      left: 250,
      width: 600
    }
  };
};

const RecommendsContent = ({ classes, recommends }) => {

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        A sneak peak
      </Typography>
      <BoxLayout classes={{ root: classes.firstBox }}>
        <CandidateInfo
          showReferrer
          candidate={recommends[0].candidate}
          referrer={recommends[0].referrer} />
      </BoxLayout>
      <BoxLayout classes={{ root: classes.secondBox }}>
        <CandidateInfo
          showReferrer
          candidate={recommends[1].candidate}
          referrer={recommends[1].referrer} />
      </BoxLayout>
    </main>
  );
};

RecommendsContent.propTypes = {
  classes: PropTypes.object.isRequired,
  recommends: PropTypes.array
};

RecommendsContent.defaultProps = {
  recommends: [
    {
      candidate: {
        firstName: 'Jane',
        lastName: 'Doe',
        avatar: 'https://images.unsplash.com/photo-1550639524-39ef65e52515?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        location: 'New York City, NY',
        currentEmployment: {
          companyName: 'Airbnb',
          title: 'Senior Product Manager'
        },
      },
      referrer: {
        firstName: 'Mark',
        lastName: 'Gerson',
        currentEmployment: {
          companyName: 'GLG',
          title: 'founder'
        },
      }
    },
    {
      candidate: {
        firstName: 'Jane',
        lastName: 'Doe',
        avatar: 'https://images.unsplash.com/photo-1554627004-d682864b6195?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        location: 'New York City, NY',
        currentEmployment: {
          companyName: 'Airbnb',
          title: 'Senior Product Manager'
        }
      },
      referrer: {
        firstName: 'Mark',
        lastName: 'Gerson',
        currentEmployment: {
          companyName: 'GLG',
          title: 'founder'
        }
      }
    }
  ]
};

export default withStyles(styles)(RecommendsContent);