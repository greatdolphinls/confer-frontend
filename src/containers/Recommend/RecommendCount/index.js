
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { pageLinks } from '../../../constants/links';
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
      margin: `${theme.spacing(5)}px 0`,
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
    }
  };
};

const RecommendCount = ({ classes, minCandidates, history }) => {
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

  const recommendButtonHandler = () => {
    history.push(pageLinks.RecommendForm.url);
  }

  const discoverButtonHandler = () => {
    history.push(pageLinks.RecommendForm.url);
  }

  const isComplete = names.length >= minCandidates;

  const renderDiscoverButton = () => {
    if (isComplete) {
      return (
        <PrimaryButton
          classes={{ root: classes.discoverButton }}
          onClick={discoverButtonHandler}>
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
        You’ve recommended {names.length} people!
        {isComplete ?
          ' You can access the shared talent network' :
          `You’re just ${minCandidates - names.length} recommendation 
          away from accessing the shared talent network`
        }
      </Typography>
      {[...Array(minCandidates)].map((e, i) => (
        <CandidateNameItem key={i} name={names[i]} />
      ))}
      <PrimaryButton
        classes={{ root: classes.recommendButton }}
        onClick={recommendButtonHandler}>
        {isComplete ?
          'Keep Recommending' :
          'Recommend Someone Great'
        }
      </PrimaryButton>
    </main>
  );
};

RecommendCount.propTypes = {
  classes: PropTypes.object.isRequired,
  minCandidates: PropTypes.number
};

RecommendCount.defaultProps = {
  minCandidates: 3
};

export default withStyles(styles)(RecommendCount);
