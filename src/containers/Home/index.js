import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { GroupCarousel } from '../../components';
import {
  HomeHeader,
  HomeTalent,
  HowItWorks,
  HomeDiscover,
  HomeKnowGreat
} from './Shared';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `${theme.spacing(6)}px 0`
    }
  };
};

const Home = ({ classes }) => {
  return (
    <main className={classes.root}>
      <HomeHeader />
      <HomeTalent />
      <GroupCarousel />
      <HowItWorks />
      <HomeDiscover />
      <HomeKnowGreat />
    </main>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
