
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { isEmpty } from '../../../utils/utility';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';
import ReferrerIcon from '../../../assets/img/icons/referrer-icon.svg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2)
      }
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.palette.buttonColor,
      marginBottom: theme.spacing(0.5)
    },
    whyGreat: {
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: '26px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('xs')]: {
        fontSize: 16
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5)
    },
    recommendContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start'
    },
    recommendInfo: {
      marginLeft: theme.spacing(0.5)
    },
    name: {
      display: 'flex',
      lineHeight: '24px',
      alignItems: 'center',
      fontSize: 20,
      fontFamily: 'Ogg',
      fontWeight: 'bold',
    },
    linkedIn: {
      width: 15,
      marginLeft: theme.spacing(1)
    },
    description: {
      fontSize: 10,
      fontWeight: 'bold',
      opacity: 0.6,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1),
    },
    list: {
      paddingLeft: 0,
      margin: 0,
      listStyle: 'none',
      '& li': {
        fontSize: 12,
        lineHeight: '15px',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(0.5)
      },
      '& li::before': {
        content: '"•"',
        color: theme.palette.buttonColor,
        marginLeft: -theme.spacing(1.5),
        fontWeight: 'bold',
        display: 'inline-block',
        width: theme.spacing(1.5),
        fontSize: 20,
        lineHeight: '10px'
      }
    }
  };
};

const RecommendCard = ({ classes, recommend, isSmall }) => {
  const { referrer, candidate, whichCapacity, whyGreat, howYouKnow } = recommend;

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.title}>
          RECOMMENDED BY:
        </Typography>
        <Typography className={classes.whyGreat}>
          {`“${whyGreat || 'XYZ'}”`}
        </Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.recommendContainer}>
          <img src={ReferrerIcon} alt='referrerIcon' />
          <div className={classes.recommendInfo}>
            <Typography
              className={classes.name}>
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
            {
              !isEmpty(referrer.shortDescription) &&
              <Typography
                className={classes.description}>
                {referrer.shortDescription}
              </Typography>
            }
            <ul className={classes.list}>
              {
                !isEmpty(howYouKnow) &&
                <li>
                  {howYouKnow || ''}
                </li>
              }
              {
                !isEmpty(whichCapacity) &&
                <li>
                  {`${candidate.firstName || ''} was ${referrer.firstName || ''}'s ${whichCapacity || ''}`}
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
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
