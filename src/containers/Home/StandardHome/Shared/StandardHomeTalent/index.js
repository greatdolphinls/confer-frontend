import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import WaveImage from '../../../../../assets/img/background/homeTalentWave.svg';
import CheckImage from '../../../../../assets/img/icons/brown-check.svg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      position: 'relative',
      justifyContent: 'space-around',
      margin: `${theme.spacing(2)}px 0`,
      padding: `${theme.spacing(15)}px 0`,
      [theme.breakpoints.down('xs')]: {
        padding: `${theme.spacing(4)}px 0`,
        flexDirection: 'column'
      }
    },
    waveImage: {
      width: '100%',
      position: 'absolute',
      top: 0
    },
    layout: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    line: {
      borderRight: `2px solid ${theme.palette.borderColor}`,
      [theme.breakpoints.down('xs')]: {
        borderRight: 0
      }
    },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    title: {
      height: 70,
      width: 260,
      display: 'flex',
      flexDirection: 'column-reverse',
      fontSize: 24,
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        height: 'unset',
        width: '100%',
        fontSize: 20
      }
    },
    description: {
      fontSize: 20,
      display: 'flex',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        fontSize: 16
      }
    },
    checkImage: {
      marginRight: theme.spacing(2)
    }
  };
};

const StandardHomeTalent = ({ classes, recommends, talents }) => {
  return (
    <main className={classes.root}>
      <img
        src={WaveImage}
        className={classes.waveImage}
        alt='waveImage' />
      <div className={classNames(classes.layout, classes.line)}>
        <div className={classes.container}>
          <Typography className={classes.title}>
            FOR RECOMMENDERS & HIRING MANAGERS
          </Typography>
          {
            recommends.map((recommend, index) => (
              <Typography
                key={index}
                className={classes.description}>
                <img
                  src={CheckImage}
                  className={classes.checkImage}
                  alt=''
                />
                {recommend}
              </Typography>
            ))
          }
        </div>
      </div>
      <div className={classes.layout}>
        <div className={classes.container}>
          <Typography className={classes.title}>
            FOR TALENT
          </Typography>
          {
            talents.map((talent, index) => (
              <Typography
                key={index}
                className={classes.description}>
                <img
                  src={CheckImage}
                  className={classes.checkImage}
                  alt=''
                />
                {talent}
              </Typography>
            ))
          }
        </div>
      </div>
    </main>
  );
};

StandardHomeTalent.propTypes = {
  classes: PropTypes.object.isRequired
};

StandardHomeTalent.defaultProps = {
  recommends: [
    'Hire unique and impressive individuals',
    'Save time sifting through resumes',
    'Make the big break in someone’s career'
  ],
  talents: [
    'Stand out from the crowd',
    'Access unique job opportunities',
    'Grow your professional network'
  ]
};

export default withStyles(styles)(StandardHomeTalent);
