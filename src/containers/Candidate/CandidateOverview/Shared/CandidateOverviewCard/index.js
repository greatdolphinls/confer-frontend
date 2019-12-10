import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import CandidateDiscoverHeaderImage from '../../../../../assets/img/icons/candidate-discover-header.svg';
import CandidateDiscoverFirstImage from '../../../../../assets/img/background/CandidateDiscover1.png';
import CandidateDiscoverSecondImage from '../../../../../assets/img/background/CandidateDiscover2.png';
import CandidateDiscoverThirdImage from '../../../../../assets/img/background/CandidateDiscover3.png';

const styles = theme => {
  return {
    root: {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      paddingLeft: theme.spacing(3),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingLeft: 0
      }
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(1)
    },
    container: {
      height: 300,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        height: 200
      }
    },
    card: {
      position: 'absolute',
      cursor: 'pointer'
    },
    card1: {
      paddingTop: 20,
      zIndex: 1
    },
    card2: {
      paddingRight: 15,
      paddingTop: 10,
      zIndex: 2
    },
    card3: {
      paddingRight: 30,
      zIndex: 3
    },
    imageContainer: {
      width: '100%',
      height: '100%'
    },
    avatar: {
      height: '100%',
      borderRadius: 10,
      objectFit: 'cover',
      [theme.breakpoints.down('xs')]: {
        width: 290
      }
    }
  };
};

const CandidateOverviewCard = ({ classes, discovers }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const continueButtonHandler = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(1);
    }
  }

  return (
    <main className={classes.root}>
      <img
        alt='DiscoverHeader'
        src={CandidateDiscoverHeaderImage} />
      <div className={classes.container}>
        {
          discovers.map((discover, index) => {
            const number = 3 + currentStep - index - 1;
            const currentIndex = number > 3 ? number - 3 : number;

            return <div
              key={index}
              className={classNames(classes.card, classes[`card${currentIndex}`])}
              onClick={continueButtonHandler}>
              <div className={classes.imageContainer}>
                <img
                  alt='DiscoverImage'
                  className={classes.avatar}
                  src={discover} />
              </div>
            </div>
          })
        }
      </div>
    </main>
  );
};

CandidateOverviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

CandidateOverviewCard.defaultProps = {
  discovers: [
    CandidateDiscoverFirstImage,
    CandidateDiscoverSecondImage,
    CandidateDiscoverThirdImage
  ]
};

export default withStyles(styles)(CandidateOverviewCard);
