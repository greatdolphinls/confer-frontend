import React, { useState, useMemo } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { InfoContainer, InfoContent } from '../..';
import { getDuration, getDiffYearsAndMonths, isEmpty } from '../../../utils/utility';

const styles = (theme) => {
  return {
    seeMore: {
      fontSize: 10,
      opacity: 0.6,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginTop: theme.spacing(0.5)
    }
  };
};

const CandidateEmployment = ({ classes, employmentHistories }) => {
  const [seeMore, setSeeMore] = useState(false);

  const lastIndex = useMemo(() => seeMore ? employmentHistories.length : 2
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [seeMore, employmentHistories]);

  const seeMoreHandler = () => {
    setSeeMore(!seeMore);
  }
  
  const getFooter = (employment) => {
    let { startMonth, startYear, endMonth, endYear, currentlyWorks } = employment;
    const duration = getDuration(startYear, startMonth, endYear, endMonth, currentlyWorks)
    const diffYearAndMonth = getDiffYearsAndMonths(startYear, startMonth, endYear, endMonth, currentlyWorks);
    let description = diffYearAndMonth
    if (!isEmpty(diffYearAndMonth) && !isEmpty(duration)) {
      description += ', ';
    }
    description += duration;
    return description;
  }

  const seeMoreRender = () => {
    if (employmentHistories.length > 2) {
      return (
        <Typography
          className={classes.seeMore}
          onClick={seeMoreHandler}>
          {seeMore ?
            <>
              <ExpandLess />
              hide more experiences
            </> :
            <>
              <ExpandMore />
              see more experiences
            </>
          }
        </Typography>
      );
    }
  }

  return (
    <InfoContainer title='Professional Experience'>
      {employmentHistories.map(
        (employment, index) => {
          if (index < lastIndex) {
            return (
              <InfoContent key={index} footer={getFooter(employment)}>
                {`${employment.title} @`}
                <u>{employment.companyName}</u>
              </InfoContent>
            )
          } else {
            return null
          }
        })
      }
      {seeMoreRender()}
    </InfoContainer>
  );
};

export default withStyles(styles)(CandidateEmployment);