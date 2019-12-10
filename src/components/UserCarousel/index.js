
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import MarkGeosonImage from '../../assets/img/users/mark_geoson.jpg';
import AmandaFreemanImage from '../../assets/img/users/amanda_freeman.jpg';
import NickTarantoImage from '../../assets/img/users/nick_taranto.jpg';
import TaliRapaportImage from '../../assets/img/users/tali_rapaport.jpg';
import YaronSamidImage from '../../assets/img/users/yaron_samid.jpg';
import AndyDunnImage from '../../assets/img/users/andy_dunn.jpg';
import RyanWilliamsImage from '../../assets/img/users/ryan_williams.jpg';
import MarieKloorImage from '../../assets/img/users/marie_kloor.jpg';
import AniqRahmanImage from '../../assets/img/users/aniq_rahman.jpg';
import SethHarrisImage from '../../assets/img/users/seth_harris.jpg';
import MiaMerrillImage from '../../assets/img/users/mia_merrill.jpg';
import JoshGreenImage from '../../assets/img/users/josh_green.jpg';
import AlexFriedmanImage from '../../assets/img/users/alex_friedman.jpg';
import MattRyanImage from '../../assets/img/users/matt_ryan.jpg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      padding: `${theme.spacing(2.5)}px 0`
    },
    card: {
      height: 220,
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `0 ${theme.spacing(1.5)}px`,
      [theme.breakpoints.down('xs')]: {
        height: 380
      }
    },
    avatar: {
      borderRadius: 8,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      marginBottom: theme.spacing(0.5)
    },
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.29)'
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
      lineHeight: '25px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Ogg',
      color: theme.palette.whiteColor,
      marginBottom: theme.spacing(0.5)
    },
    shortDescription: {
      fontSize: 10,
      lineHeight: '8px',
      textAlign: 'center',
      color: theme.palette.whiteColor
    }
  };
};

const UserCarousel = ({ classes, referrers, halfResponsive, fullResponsive, isHalf }) => {

  const responsive = useMemo(() => isHalf ? halfResponsive : fullResponsive
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [isHalf]);

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
            <div className={classes.container}>
            </div>
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

UserCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  referrers: PropTypes.array,
  responsive: PropTypes.object
};

UserCarousel.defaultProps = {
  isHalf: true,
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
      firstName: 'Nick',
      lastName: 'Taranto',
      avatar: NickTarantoImage,
      job: 'Founder',
      company: 'Plated, Trove'
    },
    {
      firstName: 'Ryan',
      lastName: 'Williams',
      avatar: RyanWilliamsImage,
      job: 'CEO & Co-founder',
      company: 'Cadre'
    },
    {
      firstName: 'Tali',
      lastName: 'Rapaport',
      avatar: TaliRapaportImage,
      job: 'VP Product',
      company: 'Lyft'
    },
    {
      firstName: 'Andy',
      lastName: 'Dunn',
      avatar: AndyDunnImage,
      job: 'Co-founder',
      company: 'Bonobos'
    },
    {
      firstName: 'Marie',
      lastName: 'Kloor',
      avatar: MarieKloorImage,
      job: 'CEO & Co-founder',
      company: 'Hydra Studios'
    },
    {
      firstName: 'Aniq',
      lastName: 'Rahman',
      avatar: AniqRahmanImage,
      job: 'Founder',
      company: 'Moat'
    },
    {
      firstName: 'Seth',
      lastName: 'Harris',
      avatar: SethHarrisImage,
      job: 'CEO & Co-founder',
      company: 'HuddleUp Technologies'
    },
    {
      firstName: 'Mia',
      lastName: 'Merrill',
      avatar: MiaMerrillImage,
      job: 'VP',
      company: 'Venture Studio'
    },
    {
      firstName: 'Josh',
      lastName: 'Green',
      avatar: JoshGreenImage,
      job: 'CEO',
      company: 'Panjiva'
    },
    {
      firstName: 'Alex',
      lastName: 'Friedman',
      avatar: AlexFriedmanImage,
      job: 'Co-founder',
      company: 'Lola'
    },
    {
      firstName: 'Matt',
      lastName: 'Ryan',
      avatar: MattRyanImage,
      job: 'CEO',
      company: 'Roth Ryan Hayes'
    }
  ],
  halfResponsive: {
    480: { items: 2 },
    680: { items: 3 }
  },
  fullResponsive: {
    480: { items: 2 },
    680: { items: 4 },
    960: { items: 5 },
    1280: { items: 6 }
  }
};

export default withStyles(styles, { withTheme: true })(UserCarousel);
