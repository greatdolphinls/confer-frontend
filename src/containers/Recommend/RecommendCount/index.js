
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
      fontSize: 30,
      fontWeight: 'bold',
    },
    description: {
      width: 620,
      fontSize: 18,
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
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    outlineButton: {
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

  const isComplete = recommends.length >= minCandidates;
  const isWeakUser = user.role === roles.WEAK_ROLE;
  const emptyLength = isComplete? 0 : minCandidates - recommends.length;
  const lastIndex = isComplete? recommends.length : minCandidates;

  const getDescription = () => {
    let description = '';

    if (isComplete) {
      if (isWeakUser) {
        if(user.verified){
          description = `Thank you for making your recommendations. 
          They have been apprved! You should have received an Amazon 
          gift card. If you did not, please contact support@hellomerit.com.`;
        } else {
          description = `Thank you for making your recommendations. 
          We will notify you once they have been approved and will 
          send your Amazon gift card then! You can add up to five 
          recommendations if you’d like!`;
        }
      } else {
        if(user.verified){
          description = `Thank you for making your recommendations. 
          You can now search for talent!`;
        } else {
          description = `Thank you for making your recommendations. 
          We will notify you once they have been approved and will 
          send your Amazon gift card then! You can add up to five 
          recommendations if you’d like!`;
        }
      }
    } else {
      switch (recommends.length) {
        case 0:
          description = `You have not submitted a recommendation yet! 
          Get started below.`;
          break;
        case 1:
          description = `You’ve recommended 1 person! You have just 
          2 more to go!`;
          break;
        case 2:
          description = `You’ve recommended 2 people! You have just 
          one more to go!`;
          break;
        default:
          break
      }
    }
    return description;
  }

  const renderButtonContainer = () => {
    if(isComplete){
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
        {getDescription()}
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
