
import React from 'react';
import PropTypes from 'prop-types';
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
      marginBottom: theme.spacing(6)
    },
    description: {
      marginBottom: theme.spacing(1),
      opacity: 0.6,
      textAlign: 'center'
    },
    groupLogo: {
      width: '100%',
      height: 38
    }
  };
};

const GroupCarousel = ({ classes, groups, responsive }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.description}>
        Our members come from Fortune 500 companies and
        startups - they’re all looking to hire or be hired!
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
          <img
            key={index}
            src={group}
            className={classes.groupLogo}
            alt='' />
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
    WeworkLogo,
    McKinseyLogo,
    BonobosLogo,
    SeamlessLogo,
    BCGLogo,
    LYALogo,
    CADRELogo,
    GLGLogo,
    TechForAmericaLogo,
    GoldmanSachsLogo,
  ],
  responsive: {
    0: { items: 3 },
    480: { items: 6 },
    960: { items: 8 },
    1280: { items: 10 }
  }
};

export default withStyles(styles, { withTheme: true })(GroupCarousel);
