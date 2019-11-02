
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import MarkGeosonImage from '../../../../assets/img/users/mark_geoson.jpg';
import AmandaFreemanImage from '../../../../assets/img/users/amanda_freeman.jpg';
import TaliRapaportImage from '../../../../assets/img/users/tali_rapaport.jpg';
import YaronSamidImage from '../../../../assets/img/users/yaron_samid.jpg';

const styles = theme => {
  return {
    root: {
      margin: `${theme.spacing(2.5)}px 0`
    },
    card: {
      height: 220,
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `0 ${theme.spacing(1.5)}px`
    },
    avatar: {
      borderRadius: 8,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      marginBottom: theme.spacing(0.5)
    },
    content: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      bottom: theme.spacing(2)
    },
    name: {
      fontSize: 25,
      lineHeight: '21px',
      fontWeight: 500,
      textAlign: 'center',
      fontFamily: 'Moret-Bold',
      color: theme.palette.whiteColor,
      marginBottom: theme.spacing(0.5)
    },
    shortDescription: {
      fontSize: 10,
      textAlign: 'center',
      color: theme.palette.whiteColor
    }
  };
};

const AuthCarousel = ({ classes, referrers, responsive }) => {
  return (
    <div className={classes.root}>
      <AliceCarousel
        mouseDragEnabled
        autoPlay
        autoPlayInterval={2000}
        fadeOutAnimation
        responsive={responsive}
        dotsDisabled={true}
        buttonsDisabled={true} >
        {referrers.map((referrer, index) => (
          <div key={index} className={classes.card}>
            <img
              src={referrer.avatar}
              className={classes.avatar}
              alt='' />
            <div className={classes.content}>
              <Typography className={classes.name}>
                {referrer.firstName}
                <br />
                {referrer.lastName}
              </Typography>
              <Typography className={classes.shortDescription}>
                {referrer.job}
                <br />
                @ <u>{referrer.company}</u>
              </Typography>
            </div>
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
};

AuthCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  referrers: PropTypes.array,
  responsive: PropTypes.object
};

AuthCarousel.defaultProps = {
  referrers: [
    {
      firstName: 'Mark',
      lastName: 'Gerson',
      avatar: MarkGeosonImage,
      job: 'Co-founder',
      company: 'GLG'
    },
    {
      firstName: 'Yaron',
      lastName: 'Samid',
      avatar: YaronSamidImage,
      job: 'CEO & Co-founder',
      company: 'BillGuard'
    },
    {
      firstName: 'Amanda',
      lastName: 'Freeman',
      avatar: AmandaFreemanImage,
      job: 'Founder & CEO',
      company: 'SLT'
    },
    {
      firstName: 'Tali',
      lastName: 'Rapaport',
      avatar: TaliRapaportImage,
      job: 'VP Product',
      company: 'Lyft'
    }
  ],
  responsive: {
    480: { items: 2 },
    680: { items: 4 },
    960: { items: 3 },
    1280: { items: 3 }
  }
};

export default withStyles(styles, { withTheme: true })(AuthCarousel);
