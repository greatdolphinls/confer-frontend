import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { HomeStepLayout } from '../../../Shared';
import RecommendHomeRecollect from '../../../../../assets/img/background/recommendHomeRecollect.png';
import RecommendHomeRecommend from '../../../../../assets/img/background/recommendHomeRecommend.png';
import RecommendHomeDiscover from '../../../../../assets/img/background/recommendHomeDiscover.png';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
  };
};

const RecommendHomeSteps = ({ classes, steps }) => {
  return (
    <main className={classes.root}>
      {
        steps.map((step, index) =>
          <HomeStepLayout
            key={index}
            step={step} />
        )
      }
    </main>
  );
};

RecommendHomeSteps.propTypes = {
  classes: PropTypes.object.isRequired
};

RecommendHomeSteps.defaultProps = {
  steps: [
    {
      no: 1,
      title: 'Recollect',
      descriptions: [
        `Take a trip down memory lane by recalling the truly great peers, 
        managers and direct reports you’ve worked with.`,
        `Consider the sales associate who went above and beyond or the 
        star marketing director who led by example.They don’t have to be 
        looking for a a job, just really great!`
      ],
      image: RecommendHomeRecollect
    },
    {
      no: 2,
      title: 'Recommend',
      descriptions: [
        `Recommendations take just 5 minutes but capture why the person 
        you’re recommending stands out.`,
        `We believe transparency instills trust in our platform, so we 
        notify the person you recommend and share your recommendation 
        once they sign up.`
      ],
      image: RecommendHomeRecommend
    },
    {
      no: 3,
      title: 'Reap the Rewards',
      descriptions: [
        `The person you recommend will be beyond flattered!`,
        `Plus you’ll help advance their career - they’ll get to choose to 
        connect with top companies seeking to fill full-time and advisory 
        positions.`,
        `And if that’s not enough, we’ll email the reward associated with 
        the access code you used.`
      ],
      image: RecommendHomeDiscover
    }
  ]
};

export default withStyles(styles)(RecommendHomeSteps);
