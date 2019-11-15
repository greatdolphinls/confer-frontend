import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { InfoContainer, InfoContent, CandidateEmployment } from '../..';

const styles = theme => {
  return {
    root: {
      minWidth: 400,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(2)}px 0`,
      padding: `0 ${theme.spacing(2)}px`,
      [theme.breakpoints.down('sm')]: {
        minWidth: 'unset',
        width: '100%',
        padding: 0
      },
      '& svg': {
        color: theme.palette.buttonColor
      }
    }
  };
};

const CandidateSnapshot = ({ classes, recommend }) => {

  const renderEducation = () => {
    const { candidate: { educationHistories } } = recommend;

    return (
      <InfoContainer title='Education'>
        {educationHistories.map((education, index) => {
          let footer = education.degree;
          footer += !!education.majorOrFocus ? `, ${education.majorOrFocus}` : '';
          footer += !!education.graduatingYear && `, ${education.graduatingYear}`;
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
      <CandidateEmployment
        employmentHistories={recommend.candidate.employmentHistories} />
      {renderEducation()}
    </div>
  );
};

export default withStyles(styles)(CandidateSnapshot);