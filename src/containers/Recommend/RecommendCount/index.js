
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { pageLinks } from '../../../constants/links';
import { roles } from '../../../constants/roles';
import { PrimaryButton } from '../../../components';
import { CandidateNameItem, RecommendStepper } from '../Shared';
import { setUserRecommends } from '../../../actions';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(7.5),
      position: 'relative'
    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      marginBottom: theme.spacing(2.5)
    },
    description: {
      width: 484,
      textAlign: 'center',
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    recommendButton: {
      width: 275,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    discoverButton: {
      width: 275,
      color: theme.palette.mainBackColor,
      backgroundColor: theme.palette.subButtonColor,
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        right: 0,
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    groundButton: {
      opacity: 0.6,
      fontSize: 12,
      cursor: 'pointer',
      textAlign: 'center',
      marginBottom: theme.spacing(5),
    }
  };
};

const RecommendCount = ({
  classes, minCandidates, maxCandidates, history
}) => {
  const { user } = useSelector(state => state.auth, []);
  const recommends = useSelector(state => state.recommend.user, []);
  const dispatch = useDispatch();
  const [names, setNames] = useState([]);

  useEffect(() => {
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const names = recommends.map(({ candidate: { firstName, lastName } }) => (firstName + ' ' + lastName));
    setNames(names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommends]);

  const buttonHandler = (url) => () => {
    history.push(url);
  }

  const isComplete = names.length >= minCandidates;
  const isWeakUser = user.role === roles.WEAK_ROLE;

  const getDescription = () => {
    let description = '';

    if (isComplete) {
      if (isWeakUser) {
        description = `Thank you for submitting your recommendations! 
        We are reviewing them and will notify you once 
        they have been approved so you can get your reward. 
        You can continue submitting up to 5 people.`;
      } else {
        description = `Thank you for submitting your recommendations! 
        We are reviewing them and will notify you once 
        they have been approved so you can start searching 
        for talent. You can continue submitting up to 5 people.`;
      }
    } else {
      description = `You’ve recommended ${names.length} ${names.length === 1 ? 'person' : 'people'}! `;

      if (isWeakUser) {
        description += ` You’re just ${minCandidates - names.length} 
        more away from accessing your reward`;
      } else {
        description += ` You’re just ${minCandidates - names.length} 
        more away from accessing the talent collective`;
      }
    }
    return description;
  }

  const renderDiscoverButton = () => {
    if (isComplete && !isWeakUser) {
      return (
        <PrimaryButton
          classes={{ root: classes.discoverButton }}
          onClick={buttonHandler(pageLinks.Discover.url)}>
          discover top talent
        </PrimaryButton>
      );
    }
  }

  return (
    <main className={classes.root}>
      {renderDiscoverButton()}
      <Typography className={classes.title}>
        Your Recommendations
      </Typography>
      <RecommendStepper activeStep={names.length} />
      <Typography className={classes.description}>
        {getDescription()}
      </Typography>
      {names.map((name, index) =>
        <CandidateNameItem key={index} name={name} />
      )}
      <PrimaryButton
        disabled={maxCandidates <= names.length}
        classes={{ root: classes.recommendButton }}
        onClick={buttonHandler(pageLinks.RecommendForm.url)}>
        Recommend Someone Great
      </PrimaryButton>
      <Typography
        className={classes.groundButton}
        onClick={buttonHandler(pageLinks.GroundRules.url)} >
        See how to recommend
      </Typography>
    </main>
  );
};

RecommendCount.propTypes = {
  classes: PropTypes.object.isRequired,
  maxCandidates: PropTypes.number,
  minCandidates: PropTypes.number
};

RecommendCount.defaultProps = {
  maxCandidates: 5,
  minCandidates: 3
};

export default withStyles(styles)(RecommendCount);
