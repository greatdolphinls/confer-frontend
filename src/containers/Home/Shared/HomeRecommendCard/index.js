import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      width: 430,
      height: 560,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      boxShadow: '20px 4px 20px rgba(0, 0, 0, 0.2)',
      [theme.breakpoints.down('xs')]: {
        width: 260,
        height: 360
      }
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      objectFit: 'cover'
    },
    container: {
      position: 'absolute',
      padding: theme.spacing(5),
      bottom: 0
    },
    description: {
      textAlign: 'center',
      fontSize: 30,
      lineHeight: '35px',
      fontFamily: 'Moret',
      color: theme.palette.whiteColor,
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 20,
        lineHeight: '28px'
      },
      '& span': {
        fontFamily: 'Moret',
        backgroundImage: `linear-gradient(180deg, ${theme.palette.mainBackColor} 50%, ${theme.palette.sandBackColor} 100%)`
      }
    }
  };
};

const HomeRecommendCard = ({ classes, recommend }) => {
  const { description, avatar } = recommend;

  return (
    <main className={classes.root}>
      <img
        src={avatar}
        className={classes.avatar}
        alt='avatar' />
      <div className={classes.container}>
        <Typography className={classes.description}>
          {`“${description}”`}
        </Typography>
      </div>
    </main>
  );
};

HomeRecommendCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeRecommendCard);
