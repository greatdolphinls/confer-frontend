import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { setCurrentUserRecommend } from '../../../actions';
import { PrimaryButton, CandidateProfile, NotFound } from '../../../components';
import { pageLinks } from '../../../constants/links';
import { isEmpty } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: theme.spacing(5)
    },
    title: {
      fontSize: 34,
      marginBottom: theme.spacing(1)
    },
    description: {
      width: 533,
      fontSize: 20,
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    button: {
      width: 176
    }
  };
};

const ProfileOverview = ({ classes }) => {
  const { recommend } = useSelector(state => state.auth, {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUserRecommend());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        Your profile
      </Typography>
      <Typography className={classes.description}>
        This is how your profile appears to other members
        in your collective. we have a double opt-in policy,
        so when a member wants to connect, we’ll reach out
        to you first.
      </Typography>
      <PrimaryButton
        href={pageLinks.ProfileEdit.url}
        classes={{ root: classes.button }}>
        edit profile
      </PrimaryButton>
      {
        isEmpty(recommend)
          ? <NotFound />
          : <CandidateProfile
            recommend={recommend}
          />
      }
    </main>
  );
};

ProfileOverview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileOverview);
