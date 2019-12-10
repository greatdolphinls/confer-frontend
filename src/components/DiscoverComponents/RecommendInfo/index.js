import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { isEmpty } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      },
    },
    container: {
      width: '100%',
      minHeight: 180,
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
        margin: `${theme.spacing(1)}px 0 0 !important`
      },
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: theme.spacing(0.5)
    },
    capDescription: {
      fontSize: 12,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1.5)
    },
    description: {
      fontSize: 12,
      marginBottom: theme.spacing(1.5)
    },
    list: {
      paddingLeft: 0,
      margin: 0,
      marginBottom: theme.spacing(1.5),
      '& li': {
        fontSize: 12,
        lineHeight: '15px',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(1)
      },
      '& li::before': {
        content: '"•"',
        color: theme.palette.buttonColor,
        marginLeft: -theme.spacing(1.5),
        fontWeight: 'bold',
        display: 'inline-block',
        width: theme.spacing(1.5),
        fontSize: 20,
        lineHeight: '10px'
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
              PRIMARY SKILLS
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
              PRIMARY STRENGTHS
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