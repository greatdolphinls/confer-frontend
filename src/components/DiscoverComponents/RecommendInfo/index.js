import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { } from '../..';
import { Typography } from '@material-ui/core';
import { isEmpty } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      },
    },
    container: {
      maxWidth: 240,
      width: '100%',
      height: 'fit-content',
      minHeight: 240,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 10,
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
      backgroundColor: theme.palette.lightBrownBackColor,
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'unset',
        margin: 0,
        '&:first-child': {
          marginRight: theme.spacing(1)
        },
        '&:last-child': {
          marginLeft: theme.spacing(1)
        }
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'unset',
        margin: `${theme.spacing(2)}px 0 !important`
      },
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: theme.palette.buttonColor,
      marginBottom: theme.spacing(1)
    },
    capDescription: {
      fontSize: 14,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(2)
    },
    description: {
      fontSize: 14,
      marginBottom: theme.spacing(2)
    },
    list: {
      paddingLeft: 0,
      margin: 0,
      marginBottom: theme.spacing(2),
      '& li': {
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: theme.spacing(1)
      }
    }
  };
};

const RecommendInfo = ({ classes, recommend }) => {
  const {
    expertiseArea,
    subExpertises,
    skills,
    strengths,
    accomplishment
  } = recommend;

  const skillStrengthRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.title}>
          DISCIPLINE
        </Typography>
        <Typography className={classes.capDescription}>
          {expertiseArea || ''}
        </Typography>
        {
          !isEmpty(skills) &&
          <>
            <Typography className={classes.title}>
              {`PRIMARY ${skills.length} SKILLS`}
            </Typography>
            <ul className={classes.list}>
              {
                skills.map((skill, index) => (
                  <li key={index}>
                    {skill}
                  </li>
                ))
              }
            </ul>
          </>
        }
        {
          !isEmpty(strengths) &&
          <>
            <Typography className={classes.title}>
              {`PRIMARY ${skills.length} STRENGTHS`}
            </Typography>
            <ul className={classes.list}>
              {
                strengths.map((strength, index) => (
                  <li key={index}>
                    {strength}
                  </li>
                ))
              }
            </ul>
          </>
        }
      </div>
    );
  }

  const suitedAccomplishRender = () => {
    return (
      <div className={classes.container}>
        {
          !isEmpty(subExpertises) &&
          <>
            <Typography className={classes.title}>
              BEST SUITED FOR
            </Typography>
            <Typography className={classes.description}>
              {subExpertises[0] || ''}
            </Typography>
          </>
        }
        {
          !isEmpty(accomplishment) &&
          <>
            <Typography className={classes.title}>
              TOP ACCOMPLISHMENT
            </Typography>
            <Typography className={classes.description}>
              {accomplishment || ''}
            </Typography>
          </>
        }
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {skillStrengthRender()}
      {suitedAccomplishRender()}
    </div>
  );
};

export default withStyles(styles)(RecommendInfo);