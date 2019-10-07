
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import WeworkLogo from '../../assets/img/groupLogos/wework.svg';
import McKinseyLogo from '../../assets/img/groupLogos/mckinsey.svg';
import BonobosLogo from '../../assets/img/groupLogos/bonobos.svg';
import SeamlessLogo from '../../assets/img/groupLogos/seamless.svg';
import BCGLogo from '../../assets/img/groupLogos/bcg.svg';
import LYALogo from '../../assets/img/groupLogos/lya.svg';
import CADRELogo from '../../assets/img/groupLogos/cadre.svg';
import GLGLogo from '../../assets/img/groupLogos/glg.svg';
import TechForAmericaLogo from '../../assets/img/groupLogos/techforamerica.svg';
import GoldmanSachsLogo from '../../assets/img/groupLogos/goldmansachs.svg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      marginBottom: theme.spacing(8)
    },
    description: {
      marginBottom: theme.spacing(1),
      color: theme.palette.subForeColor,
      textAlign: 'center'
    },
    groupLogo: {
      height: 38
    }
  };
};

const GroupCarousel = ({ classes, groups, responsive }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.description}>
        Recommenders and recommendees come from a wide range of Fortune 500 companies and startups
      </Typography>
      <AliceCarousel
        mouseDragEnabled
        autoPlay
        autoPlayInterval={5000}
        fadeOutAnimation
        responsive={responsive}
        dotsDisabled={true}
        buttonsDisabled={true} >
        {groups.map((group, index) => (
          <Link key={index} to={group.url} className={classes.link}>
            <img src={group.img} className={classes.groupLogo} alt='' />
          </Link>
        ))}
      </AliceCarousel>
    </div>
  );
};

GroupCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.array,
  responsive: PropTypes.object
};

GroupCarousel.defaultProps = {
  groups: [
    {
      img: WeworkLogo,
      url: '/wework'
    },
    {
      img: McKinseyLogo,
      url: '/mckinsey'
    },
    {
      img: BonobosLogo,
      url: '/bonobos'
    },
    {
      img: SeamlessLogo,
      url: '/seamless'
    },
    {
      img: BCGLogo,
      url: '/bcg'
    },
    {
      img: LYALogo,
      url: '/lya'
    },
    {
      img: CADRELogo,
      url: '/cadre'
    },
    {
      img: GLGLogo,
      url: '/glg'
    },
    {
      img: TechForAmericaLogo,
      url: '/techforamerica'
    },
    {
      img: GoldmanSachsLogo,
      url: '/goldmansachs'
    }
  ],
  responsive: {
    0: { items: 3 },
    480: { items: 6 },
    960: { items: 8 },
    1280: { items: 10 }
  }
};

export default withStyles(styles, { withTheme: true })(GroupCarousel);
