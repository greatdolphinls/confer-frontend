
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { Avatar } from '../../../../components';
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
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 8,
      margin: `0 ${theme.spacing(1.5)}px`,
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      background: theme.palette.orangeBackColor
    },
    avatar: {
      marginBottom: theme.spacing(0.5)
    },
    name: {
      fontSize: 14,
      fontWeight: 500
    },
    shortDescription: {
      fontSize: 14,
      textAlign: 'center'
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
            <Avatar
              size={130}
              src={referrer.avatar}
              className={classes.avatar}
              alt='' />
            <Typography className={classes.name}>
              {`${referrer.firstName} ${referrer.lastName}`}
            </Typography>
            <Typography className={classes.shortDescription}>
              {referrer.shortDescription}
            </Typography>
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
      shortDescription: 'Co-founder GLG'
    },
    {
      firstName: 'Yaron',
      lastName: 'Samid',
      avatar: YaronSamidImage,
      shortDescription: 'CEO & Co-founder, BillGuard'
    },
    {
      firstName: 'Amanda',
      lastName: 'Freeman',
      avatar: AmandaFreemanImage,
      shortDescription: 'Founder & CEO, SLT'
    },
    {
      firstName: 'Tali',
      lastName: 'Rapaport',
      avatar: TaliRapaportImage,
      shortDescription: 'VP Product, Lyft'
    }
  ],
  responsive: {
    480: { items: 2 },
    720: { items: 4 },
    960: { items: 3 },
    1280: { items: 3 }
  }
};

export default withStyles(styles, { withTheme: true })(AuthCarousel);
