
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { pageLinks } from '../../../constants/links';
import { roles } from '../../../constants/roles';
import { PrimaryButton, OutlineButton } from '../../../components';
import { CountLayout } from './Shared';
import { setUserRecommends } from '../../../actions';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(5)
    },
    title: {
      fontSize: 45,
      fontFamily: 'Ogg'
    },
    description: {
      width: 620,
      fontSize: 20,
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: 480,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    outlineButton: {
      opacity: 0.6,
      width: 250,
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    primaryButton: {
      marginBottom: theme.spacing(1.5),
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

  useEffect(() => {
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonHandler = (url) => () => {
    history.push(url);
  }

  const isComplete = useMemo(() => recommends.length >= minCandidates
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [recommends]);

  const isWeakUser = useMemo(() => user.role === roles.WEAK_ROLE
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user]);

  const emptyLength = useMemo(() => isComplete ? 0 : minCandidates - recommends.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [recommends]);

  const lastIndex = useMemo(() => isComplete ? recommends.length : minCandidates
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [recommends]);

  const description = useMemo(() => {
    if (isWeakUser) {
      if (user.verified) {
        return `Thank you. Your recommendations have been approved! 
        Please share Merit with other professionals whose recommendations 
        you would trust.`;
      } else {
        switch (recommends.length) {
          case 0:
            return `You haven't submitted a recommendation yet! 
            Get started below.`;
          case 1:
            return `You’ve submitted 1 recommendation. You can 
            submit 4 more! We’ll be in touch about your reward.`;
          case 2:
            return `You’ve submitted 2 recommendations. You can 
            submit 3 more! We’ll be in touch about your reward.`;
          case 3:
            return `You’ve submitted 3 recommendations. You can 
            submit 2 more! We’ll be in touch about your reward.`;
          case 4:
            return `You’ve submitted 4 recommendations. You can 
            submit 1 more! We’ll be in touch about your reward.`;
          case 5:
            return `You’ve submitted 5 recommendations. Thank you, 
            we’ll be in touch about your reward! Please share Merit with 
            other professionals whose recommendations you would trust.`;
          default:
            return '';
        }
      }
    } else {
      if (isComplete) {
        if (user.verified) {
          return `Thank you for making your recommendations. You're 
          all set to search for talent and make your next hire.`;
        } else {
          return `Thank you for making your recommendations! 
          We will notify you once they are approved. Is there someone 
          you left out? You can make up to five recommendations 
          if you'd like.`;
        }
      } else {
        switch (recommends.length) {
          case 0:
            return `You haven't submitted a recommendation yet! 
            Get started below.`;
          case 1:
            return `You've recommended one person! You have just 
            two more to go.`;
          case 2:
            return `You've recommended two people! You have one 
            more left.`;
          default:
            return '';
        }
      }
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [isWeakUser, isComplete, user, recommends]);

  const renderButtonContainer = () => {
    if (isComplete) {
      return (
        <>
          {
            !isWeakUser &&
            <PrimaryButton
              classes={{ root: classes.primaryButton }}
              onClick={buttonHandler(pageLinks.Discover.url)}>
              Discover Talent
            </PrimaryButton>
          }
          <OutlineButton
            disabled={maxCandidates <= recommends.length}
            classes={{ root: classes.outlineButton }}
            onClick={buttonHandler(pageLinks.RecommendForm.url)}>
            KEEP RECOMMENDING
          </OutlineButton>
          <Typography
            className={classes.groundButton}
            onClick={buttonHandler(pageLinks.GroundRules.url)} >
            See how to recommend
          </Typography>
        </>
      )
    } else {
      return (
        <>
          <PrimaryButton
            classes={{ root: classes.primaryButton }}
            onClick={buttonHandler(pageLinks.RecommendForm.url)}>
            RECOMMEND SOMEONE GREAT
          </PrimaryButton>
          <Typography
            className={classes.groundButton}
            onClick={buttonHandler(pageLinks.GroundRules.url)} >
            See how to recommend
          </Typography>
        </>
      )
    }
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        Your Recommendations
      </Typography>
      <Typography className={classes.description}>
        {description}
      </Typography>
      <div className={classes.container}>
        {recommends.map((recommend, index) =>
          <CountLayout
            key={index}
            step={index + 1}
            isLast={lastIndex === index + 1}
            isActive={index + 1 === recommends.length}
            isSkip={index + 1 <= recommends.length}
            recommend={recommend} />
        )}
        {[...Array(emptyLength)].map((e, i) => {
          const index = recommends.length + i + 1;
          return <CountLayout
            key={index}
            step={index}
            isLast={lastIndex === index}
            goRecommend={buttonHandler(pageLinks.RecommendForm.url)}
          />
        })}
      </div>
      {renderButtonContainer()}
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
