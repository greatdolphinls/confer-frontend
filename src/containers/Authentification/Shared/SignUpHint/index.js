
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import SignupStandardDiscoverImage from '../../../../assets/img/background/signupStandardDiscover.png';
import SignupWeakDiscoverImage from '../../../../assets/img/background/signupWeakDiscover.png';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(5)
    },
    img: {
      width: '100%'
    },
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    item: {
      width: '50%',
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    step: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      fontSize: 16,
      color: theme.palette.buttonColor,
      border: `1px solid ${theme.palette.buttonColor}`,
      borderRadius: '50%'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${theme.spacing(1)}px`
    },
    title: {
      fontSize: 20,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1)
    },
    description: {
      fontSize: 14
    }
  };
};

const SignUpHint = ({ classes, isCashGroup, cashGroup, standardGroup, groupName }) => {
  const steps = useMemo(() =>
    isCashGroup
      ? cashGroup
      : standardGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [isCashGroup]);

  const signupDiscoverImage = useMemo(() =>
    isCashGroup
      ? SignupWeakDiscoverImage
      : SignupStandardDiscoverImage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [isCashGroup]);

  return (
    <main className={classes.root}>
      <img
        className={classes.img}
        alt='SignupDiscoverImage'
        src={signupDiscoverImage} />
      <div className={classes.container}>
        {
          steps.map(({ step, title, description }, index) => (
            <div key={index} className={classes.item}>
              <div>
                <Typography className={classes.step}>
                  {step}
                </Typography>
              </div>
              <div className={classes.content}>
                <Typography className={classes.title}>
                  {title}
                </Typography>
                <Typography className={classes.description}>
                  {
                    (!isCashGroup && step === 2 && !!groupName)
                      ? description.replace('your group', groupName)
                      : description
                  }
                </Typography>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
};

SignUpHint.propTypes = {
  classes: PropTypes.object.isRequired,
  isCashGroup: PropTypes.bool,
  standardGroup: PropTypes.array,
  cashGroup: PropTypes.array
};

SignUpHint.defaultProps = {
  standardGroup: [
    {
      step: 1,
      title: 'Recommend',
      description: `Share 3 of the best people who you have 
      worked with. Flatter them and give them the recognition 
      they deserve!`
    },
    {
      step: 2,
      title: 'Discover',
      description: `Search recommendations made by everyone in 
      your group to fill full-time and advisory positions. 
      Subscribe to see all top 3 recommendations.`
    }
  ],
  cashGroup: [
    {
      step: 1,
      title: 'Recommend',
      description: `Share up to 5 of the best people who 
      you have worked with. Top companies will seek them 
      out for full-time and advisory positions.`
    },
    {
      step: 2,
      title: 'Reap the rewards',
      description: `You’ll earn their gratitude and ours, 
      so we’ll send you a small token of appreciation 
      for each recommendation.`
    }
  ]
};

export default withStyles(styles, { withTheme: true })(SignUpHint);
