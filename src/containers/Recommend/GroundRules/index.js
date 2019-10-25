import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { pageLinks } from '../../../constants/links';
import { roles } from '../../../constants/roles';
import { PrimaryButton } from '../../../components';
import RecommendsContent from './RecommendsContent';
import RecommendRules from './RecommendRules';
import InspirationModal from './InspirationModal';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: `${theme.spacing(8)}px 0`
    },
    container: {
      display: 'flex',
      width: 620,
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      }
    },
    title: {
      fontSize: 34,
      marginBottom: theme.spacing(2)
    },
    description: {
      fontSize: 20,
      letterSpacing: 0.15,
      marginBottom: theme.spacing(2),
      '& span': {
        color: theme.palette.buttonColor,
        cursor: 'pointer'
      }
    },
    buttonContainer: {
      display: 'flex',
      width: 'fit-content',
      flexDirection: 'column',
      margin: `${theme.spacing(1.5)}px 0`,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    readyButton: {
      width: 275,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    faqButton: {
      fontSize: 12,
      textAlign: 'center',
      cursor: 'pointer'
    }
  };
};

const GroundRules = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const [showModal, setShowModal] = useState(false);

  const buttonHandler = (url) => () => {
    history.push(url);
  }

  const showModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const members = user.role === roles.WEAK_ROLE
    ? 'Hiring managers will be able to see who recommended a person but not a list'
    : 'All members';

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.title}>
          How to recommend
        </Typography>
        <Typography className={classes.description}>
          By participating, you will be elevating people’s careers
          and recognizing excellence. You may recommend up to five
          people. The people you recommend must be remarkable
          people who you have personally worked with.
        </Typography>
        <RecommendRules />
        <Typography className={classes.description}>
          {`Since transparency drives trust in the network, we will
          notify the people you recommend (you can give them a
          heads up!). `}
          {members} across our communities will be
          able to see who recommended a person but not a list of
          all your recommendations. Before we connect anyone,
          both people must opt-in.
        </Typography>
        <Typography className={classes.description}>
          Want inspiration?
          <span onClick={showModalHandler}>
            See some examples
          </span>
        </Typography>
        <div className={classes.buttonContainer}>
          <PrimaryButton
            classes={{ root: classes.readyButton }}
            onClick={buttonHandler(pageLinks.RecommendForm.url)}
          >
            OK, I’m ready
          </PrimaryButton>
          <Typography
            className={classes.faqButton}
            onClick={buttonHandler(pageLinks.FAQ.url)}
          >
            Questions? Check out our FAQ.
          </Typography>
        </div>
      </div>
      <RecommendsContent />
      {
        showModal &&
        <InspirationModal
          opened={showModal}
          onClose={closeModalHandler}
        />
      }
    </main>
  );
};

GroundRules.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroundRules);