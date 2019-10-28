import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { InfoContainer, InfoContent, CandidateEmployment } from '../..';

const styles = theme => {
  return {
    root: {
      minWidth: 418,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 13,
      backgroundColor: theme.palette.subBackColor5,
      marginLeft: theme.spacing(4),
      padding: `${theme.spacing(2)}px ${theme.spacing(3.5)}px`,
      [theme.breakpoints.down('sm')]: {
        minWidth: 'unset',
        width: '100%',
        marginLeft: 0,
        padding: theme.spacing(2)
      }
    },
    title: {
      fontSize: 24
    }
  };
};

const CandidateSnapshot = ({ classes, recommend }) => {

  const renderEducation = () => {
    const { candidate: { educationHistories } } = recommend;

    return (
      <InfoContainer title='Education'>
        {educationHistories.map((education, index) => {
          const footer = `${education.degree}, ${education.majorOrFocus}, ${education.graduatingYear}`;
          return (
            <InfoContent key={index} footer={footer}>
              {`Student @ ${education.school}`}
            </InfoContent>
          )
        })}
      </InfoContainer>
    );
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {`${recommend.candidate.firstName}’s Snapshot`}
      </Typography>
      <CandidateEmployment
        employmentHistories={recommend.candidate.employmentHistories} />
      {renderEducation()}
    </div>
  );
};

export default withStyles(styles)(CandidateSnapshot);