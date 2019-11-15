
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getCurrentEmployment, isEmpty } from '../../../utils/utility';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
        marginLeft: 0
      }
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.palette.buttonColor,
      marginBottom: theme.spacing(2)
    },
    smallTitle: {
      fontSize: 16,
      marginBottom: theme.spacing(0.5)
    },
    name: {
      display: 'flex',
      lineHeight: '35px',
      alignItems: 'center',
      fontSize: 30,
      fontFamily: 'Moret-Bold'
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
      textTransform: 'uppercase',
      marginBottom: theme.spacing(0.5),
      color: theme.palette.blackBrownForeColor
    },
    smallDescription: {
      fontSize: 12
    },
    recommendContainer: {
      width: '100%',
      marginTop: theme.spacing(1),
      paddingTop: theme.spacing(1.5),
      borderTop: `0.5px solid ${theme.palette.blackBrownForeColor}`
    },
    content: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: '35px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 6,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
      }
    },
    smallContent: {
      fontSize: 18,
      marginTop: 0,
      lineHeight: '26px'
    }
  };
};

const RecommendCard = ({ classes, recommend, isSmall }) => {
  const { referrer, candidate, whichCapacity, whyGreat, howYouKnow } = recommend;
  const currentEmployment = getCurrentEmployment(referrer.employmentHistories);

  return (
    <div className={classes.root}>
      <Typography
        className={classNames(classes.title, { [classes.smallTitle]: isSmall })}>
        RECOMMENDED BY:
      </Typography>
      <Typography
        className={classNames(classes.name, { [classes.smallName]: isSmall })}>
        {`${referrer.firstName || ''} ${referrer.lastName || ''}`}
        <a
          target='_blank'
          rel='noreferrer noopener'
          href={referrer.linkedInURL}
          className={classes.logoContainer}>
          <img
            src={LinkedInImage}
            alt='linkedIn'
            className={classes.linkedIn} />
        </a>
      </Typography>
      <Typography
        className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
        {`${currentEmployment.companyName || ''}, ${currentEmployment.title || ''}`}
      </Typography>
      <div className={classes.recommendContainer}>
        {
          !isEmpty(howYouKnow) &&
          <Typography
            className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
            {howYouKnow || ''}
          </Typography>
        }
        {
          !isEmpty(whichCapacity) &&
          <Typography
            className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
            {`${candidate.firstName || ''} was ${referrer.firstName || ''}'s ${whichCapacity || ''}`}
          </Typography>
        }
      </div>
      <Typography
        className={classNames(classes.content, { [classes.smallContent]: isSmall })}>
        {`“${whyGreat || 'XYZ'}”`}
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
