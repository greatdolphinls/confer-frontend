import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import UpHandImage from '../../../../assets/img/icons/up-hand.svg';
import DownHandImage from '../../../../assets/img/icons/down-hand.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: theme.spacing(3)
    },
    img: {
      marginRight: theme.spacing(1)
    },
    description: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    subDescription: {
      fontSize: 20,
      fontWeight: 'normal'
    }
  };
};

const RecommendRules = ({ classes, rules }) => {

  return (
    <>
      {rules.map(({ img, description, subDescription }, index) => (
        <div key={index} className={classes.root}>
          <img
            src={img}
            className={classes.img}
            alt=''
          />
          <Typography className={classes.description}>
            {description}
            {
              !!subDescription &&
              <span className={classes.subDescription}>
                {subDescription}
              </span>
            }
          </Typography>
        </div>
      ))}
    </>
  );
};

RecommendRules.propTypes = {
  classes: PropTypes.object.isRequired,
  rules: PropTypes.array
};

RecommendRules.defaultProps = {
  rules: [
    {
      img: UpHandImage,
      description: 'Peers, direct reports, managers, or clients',
    },
    {
      img: UpHandImage,
      description: 'Current or past co-workers',
      subDescription: '(though we don’t expect current! think back across your career)'
    },
    {
      img: UpHandImage,
      description: 'Either looking or not looking for a job currently',
    },
    {
      img: DownHandImage,
      description: 'Family members or good friends who you never worked with',
    }
  ]
};

export default withStyles(styles)(RecommendRules);