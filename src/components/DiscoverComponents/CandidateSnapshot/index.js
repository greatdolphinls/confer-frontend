import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { roles } from '../../../constants/roles';
import { InfoContainer, InfoContent, CandidateEmployment } from '../..';
import GroupIcon from '../../../assets/img/icons/group-icon.svg';
import { isEmpty } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      maxWidth: 260,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'unset',
        width: '100%'
      },
    },
    groupContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    group: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: theme.palette.blueForeColor
    },
    candidateContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${theme.spacing(2)}px`,
      [theme.breakpoints.down('sm')]: {
        padding: 0
      },
      '& svg': {
        color: theme.palette.buttonColor
      }
    }
  };
};

const CandidateSnapshot = ({ classes, candidate }) => {
  const { educationHistories, employmentHistories, groupObjects } = candidate;

  const renderEducation = () => {
    if (!isEmpty(educationHistories)) {
      return (
        <InfoContainer title='Education'>
          {educationHistories.map(({ degree, majorOrFocus, graduatingYear, school }, index) => {
            let footer = degree;
            if (!!degree && !!majorOrFocus) {
              footer += ', ';
            }
            footer += majorOrFocus;
            if ((!!degree || !!majorOrFocus) && graduatingYear) {
              footer += ', ';
            }
            footer += graduatingYear;
            return (
              <InfoContent key={index} footer={footer}>
                {'Student @'}
                <u>{school}</u>
              </InfoContent>
            )
          })}
        </InfoContainer>
      );
    }
  }

  return (
    <main className={classes.root}>
      <div className={classes.groupContainer}>
        {
          !isEmpty(groupObjects) &&
          groupObjects.filter((group) => group.role === roles.GROUP_DISCOVER_ROLE)
            .map((group, index) => (
              <Typography key={index} className={classes.group}>
                <img
                  alt='GroupIcon'
                  src={GroupIcon}
                  className={classes.groupIcon} />
                {group.name}
              </Typography>
            ))
        }
      </div>
      <div className={classes.candidateContainer}>
        {
          !isEmpty(employmentHistories) &&
          <CandidateEmployment
            employmentHistories={employmentHistories} />
        }
        {renderEducation()}
      </div>
    </main>
  );
};

export default withStyles(styles)(CandidateSnapshot);