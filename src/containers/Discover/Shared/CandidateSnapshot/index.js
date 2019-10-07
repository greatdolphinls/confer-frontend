import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { InfoContainer, InfoContent } from '../index';
const styles = theme => {
  return {
    root: {
      minWidth: 418,
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

  const renderExperise = () => {
    const { expertiseArea, subExpertises } = recommend;
    const expertises
      = expertiseArea + ','
      + subExpertises.map((subExpertise) => (' ' + subExpertise));

    return (
      <InfoContainer title='Expertise'>
        <InfoContent>
          {expertises}
        </InfoContent>
      </InfoContainer>
    );
  }

  const renderEmployment = () => {
    const { candidate: { employmentHistories } } = recommend;

    return (
      <InfoContainer title='Education'>
        {employmentHistories.slice(0).reverse().map(
          ({ startMonth, startYear, endMonth, endYear, currentlyWorks, title, companyName }, index) => {
            const startDate = `${startMonth} ${startYear}`;
            const endDate = currentlyWorks ? 'present' : `${endMonth} ${endYear}`;
            const duration = (currentlyWorks ? (new Date().getFullYear()) : parseInt(endYear, 10)) - parseInt(startYear, 10);
            const footer = `${duration} years, ${startDate} - ${endDate}`;

            return (
              <InfoContent key={index} footer={footer}>
                {`${title} @ ${companyName}`}
              </InfoContent>
            )
          })
        }
      </InfoContainer>
    );
  }

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
      {renderExperise()}
      {renderEmployment()}
      {renderEducation()}
    </div>
  );
};

export default withStyles(styles)(CandidateSnapshot);