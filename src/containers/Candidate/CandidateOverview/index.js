import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as CANDIDATE_SERVICE from '../../../services/candidate';
import { GroupCarousel, PrimaryButton } from '../../../components';
import { CandidateOverviewCard } from './Shared';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications'
import { isEmpty, showErrorToast } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(10)
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(10),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    descriptionContainer: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      paddingRight: theme.spacing(3),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
        width: '100%'
      }
    },
    title: {
      fontSize: 20,
      textTransform: 'uppercase'
    },
    name: {
      fontSize: 60,
      fontFamily: 'Ogg',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize: 36
      }
    },
    description: {
      fontSize: 18,
      marginBottom: theme.spacing(3)
    },
    joinButton: {
      width: 'max-content'
    }
  };
};

const CandidateOverview = ({ classes, match, history }) => {
  const [recommend, setRecommend] = useState({});

  useEffect(() => {
    getCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCandidate = async () => {
    const candidateId = match.params.candidateId;
    const { data } = await CANDIDATE_SERVICE.getCandidate(candidateId);
    if (isEmpty(data)) {
      showErrorToast(notifications.CANDIDATE_SIGNUP_LINK_ERROR);
      history.push(pageLinks.SignIn.url);
    } else {
      setRecommend(data);
    }
  }

  const joinButtonHandler = () => {
    history.push(pageLinks.CandidateSignup.url.replace(':candidateId', match.params.candidateId));
  }

  const descriptionContainer = () => {
    const { candidate, referrer } = recommend;

    return (
      <div className={classes.descriptionContainer}>
        <Typography className={classes.title}>
          WELCOME TO MERIT,
          </Typography>
        <Typography className={classes.name}>
          {candidate.firstName}!
          </Typography>
        <Typography className={classes.description}>
          {referrer.firstName} told us that you are one of the
          best people they have ever worked with. Now, get
          the recognition you deserve.
          </Typography>
        <Typography className={classes.description}>
          Companies use Merit to discover top talent for
          full-time roles and advisory positions. Join to
          advance your career and - if you’re hiring -
          build your team.
          </Typography>
        <Typography className={classes.description}>
          You don’t have to be currently looking for a job
          - you never know which opportunities will come your way!
          </Typography>
        <PrimaryButton
          classes={{ root: classes.joinButton }}
          onClick={joinButtonHandler}>
          Join Now
          </PrimaryButton>
      </div>
    )
  }

  return (
    <main className={classes.root}>
      {
        !isEmpty(recommend) &&
        <>
          <div className={classes.container}>
            {descriptionContainer()}
            <CandidateOverviewCard />
          </div>
          <GroupCarousel />
        </>
      }
    </main>
  );
};

CandidateOverview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CandidateOverview);
