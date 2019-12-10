import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { UserCarousel } from '../../../components';
import { HomeHeader, HomeKnowGreat } from '../Shared'
import { RecommendHomeSteps } from './Shared';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `${theme.spacing(6)}px 0`
    },
    authCarousel: {
      width: '100%',
      margin: `${theme.spacing(10)}px 0`
    },
    authTitle: {
      fontSize: 20,
      textAlign: 'center',
      textTransform: 'uppercase'
    }
  };
};

const RecommendHome = ({ classes, title, description, button }) => {
  const sendEmailHandler = async (email) => {
    console.log(email);
  }

  return (
    <main className={classes.root}>
      <HomeHeader
        title={title}
        description={description}
        button={button}
        onConfirm={sendEmailHandler}
      />
      <div className={classes.authCarousel}>
        <Typography className={classes.authTitle}>
          JOIN OTHER BUSINESS LEADERS WHO HAVE PAID IT FORWARD
        </Typography>
        <UserCarousel
          isHalf={false} />
      </div>
      <RecommendHomeSteps />
      <HomeKnowGreat
        button={button}
        onConfirm={sendEmailHandler} />
    </main>
  );
};

RecommendHome.propTypes = {
  classes: PropTypes.object.isRequired
};

RecommendHome.defaultProps = {
  title: 'Pay it forward.',
  description: `Recommend great people who have excelled 
  on-the-job to help advance their careers. `,
  button: 'REQUEST TO AN ACCESS CODE'
};

export default withStyles(styles)(RecommendHome);
