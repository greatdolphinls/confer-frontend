
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getCurrentEmployment } from '../../../utils/utility';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        marginLeft: 0
      }
    },
    title: {
      fontWeight: 'bold',
      color: theme.palette.buttonColor,
      marginBottom: theme.spacing(1)
    },
    smallTitle: {
      fontSize: 14
    },
    name: {
      display: 'flex',
      alignItems: 'flex-end',
      fontSize: 30,
      lineHeight: '20px',
      fontFamily: 'Moret-Bold',
      marginBottom: theme.spacing(0.5)
    },
    smallName: {
      fontSize: 24
    },
    linkedIn: {
      marginLeft: theme.spacing(1)
    },
    description: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: theme.spacing(0.5),
      color: theme.palette.blackBrownForeColor
    },
    smallDescription: {
      fontSize: 12
    },
    recommendContainer: {
      width: '100%',
      paddingTop: theme.spacing(0.5),
      borderTop: `1.5px solid ${theme.palette.blackBrownForeColor}`
    },
    content: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: '35px'
    },
    smallContent: {
      fontSize: 24,
      lineHeight: '26px'
    }
  };
};

const RecommendCard = ({ classes, recommend, isSmall }) => {
  const { referrer, candidate, whichCapacity, whyGreat } = recommend;
  const currentEmployment = getCurrentEmployment(referrer.employmentHistories);

  return (
    <div className={classes.root}>
      <Typography
        className={classNames(classes.title, { [classes.smallTitle]: isSmall })}>
        RECOMMENDED BY:
      </Typography>
      <Typography
        className={classNames(classes.name, { [classes.smallName]: isSmall })}>
        {`${referrer.firstName} ${referrer.lastName}`}
        <img
          src={LinkedInImage}
          alt='linkedIn'
          className={classes.linkedIn} />
      </Typography>
      <Typography
        className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
        {`${currentEmployment.title} @`}
        <u>{currentEmployment.companyName}</u>
      </Typography>
      <div className={classes.recommendContainer}>
        <Typography
          className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
          {recommend.howYouKnow}
        </Typography>
        <Typography
          className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
          {`${candidate.firstName} was ${referrer.firstName}'s ${whichCapacity}`}
        </Typography>
      </div>
      <Typography
        className={classNames(classes.content, { [classes.smallContent]: isSmall })}>
        {whyGreat}
      </Typography>
    </div>
  );
};

RecommendCard.propTypes = {
  classes: PropTypes.object.isRequired
};

RecommendCard.defaultProps = {
  isSmall: false
};

export default withStyles(styles, { withTheme: true })(RecommendCard);
