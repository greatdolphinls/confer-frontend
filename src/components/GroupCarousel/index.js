
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import WeworkLogo from '../../assets/img/groupLogos/wework.svg';
import BCGLogo from '../../assets/img/groupLogos/bcg.svg';
import SeamlessLogo from '../../assets/img/groupLogos/seamless.svg';
import TeachLogo from '../../assets/img/groupLogos/teach.svg';
import RedditLogo from '../../assets/img/groupLogos/reddit.svg';
import LYALogo from '../../assets/img/groupLogos/lya.svg';
import BonobosLogo from '../../assets/img/groupLogos/bonobos.svg';

const styles = theme => {
  return {
    root: {
      width: 'calc(100vw - 16.8px)',
      alignSelf: 'center',
      height: 275,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.sandBackColor,
      '& .alice-carousel': {
        marginTop: 0,
        marginBottom: 0
      }
    },
    description: {
      marginBottom: theme.spacing(4),
      color: theme.palette.blackBrownForeColor,
      opacity: 0.6,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    container: {
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    groupLogo: {
      width: '100%',
      height: 50
    }
  };
};

const GroupCarousel = ({ classes, groups, responsive }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.description}>
          Our members come from Fortune 500 companies and
          startups - they’re all looking to hire or be hired!
        </Typography>
        <AliceCarousel
          mouseDragEnabled
          className={classes.carousel}
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
    BCGLogo,
    SeamlessLogo,
    TeachLogo,
    RedditLogo,
    LYALogo,
    BonobosLogo
  ],
  responsive: {
    0: { items: 3 },
    480: { items: 5 },
    960: { items: 6 },
    1280: { items: 7 }
  }
};

export default withStyles(styles, { withTheme: true })(GroupCarousel);
