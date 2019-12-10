import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { StandardHomeRecommendCard } from '..';
import AyeshaCurryImage from '../../../../../assets/img/users/ayesha-curry.jpg';
import JamieRyanImage from '../../../../../assets/img/users/jamie-ryan.jpg';
import AnushaGeorgeImage from '../../../../../assets/img/users/anusha-george.jpg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `${theme.spacing(5)}px 0`,
      [theme.breakpoints.down('sm')]: {
        margin: `${theme.spacing(3)}px 0`
      }
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize: 32
      }
    },
    description: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        fontSize: 16
      }
    },
    container: {
      height: 600,
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      margin: `${theme.spacing(5)}px 0`,
      [theme.breakpoints.down('xs')]: {
        height: 380,
        margin: `${theme.spacing(3)}px 0`
      }
    },
    card: {
      position: 'absolute',
      cursor: 'pointer'
    },
    card1: {
      zIndex: 1
    },
    card2: {
      paddingRight: 15,
      paddingTop: 15,
      zIndex: 2
    },
    card3: {
      paddingRight: 30,
      paddingTop: 30,
      zIndex: 3
    }
  };
};

const StandardHowItWorks = ({ classes, recommends }) => {
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
      <Typography className={classes.title}>
        Acknowledge great people.
      </Typography>
      <Typography className={classes.description}>
        Know someone whose excellent work should be recognized?
        <br />
        Pay it forward by creating new opportunities for them.
      </Typography>
      <div className={classes.container}>
        {
          recommends.map((recommend, index) => {
            const number = 3 + currentStep - index - 1;
            const currentIndex = number > 3 ? number - 3 : number;

            return <div
              key={index}
              className={classNames(classes.card, classes[`card${currentIndex}`])}
              onClick={continueButtonHandler}>
              <StandardHomeRecommendCard
                recommend={recommend}
              />
            </div>
          })
        }
      </div>
    </main>
  );
};

StandardHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

StandardHowItWorks.defaultProps = {
  recommends: [
    {
      avatar: AyeshaCurryImage,
      description: `She is one of the most scrappy and tenacious 
      professionals I have ever been around.`
    },
    {
      avatar: JamieRyanImage,
      description: `Her leadership on the team was so impactful, 
      she still mentors junior members in her free time.`
    },
    {
      avatar: AnushaGeorgeImage,
      description: `Her vibrant energy was never ending, a breath 
      of fresh air in a tense room.`
    }
  ]
};

export default withStyles(styles)(StandardHowItWorks);
