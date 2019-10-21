import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

import { InfoContainer, InfoContent } from '../index';
import { getDuration, getDiffYearsAndMonths } from '../../../../utils/utility';
import theme from '../../../../theme/muiTheme';

const styles = () => {
  return {
    seeMore: {
      fontSize: 12,
      opacity: 0.6,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginTop: theme.spacing(0.5)
    }
  };
};

const CandidateEmployment = ({ classes, employmentHistories }) => {
  const [seeMore, setSeeMore] = useState(false);

  const seeMoreHandler = () => {
    setSeeMore(!seeMore);
  }

  const getFooter = (employment) => {
    let { startMonth, startYear, endMonth, endYear, currentlyWorks } = employment;

    const duration = getDuration(startYear, startMonth, endYear, endMonth, currentlyWorks)
    const diffYearAndMonth = getDiffYearsAndMonths(startYear, startMonth, endYear, endMonth, currentlyWorks);
    return `${diffYearAndMonth} , ${duration}`;
  }

  const seeMoreRender = () => {
    if (employmentHistories.length > 2) {
      return (
        <Typography
          className={classes.seeMore}
          onClick={seeMoreHandler}>
          {seeMore ?
            <>
              <ArrowDropUp />
              hide more experiences
            </> :
            <>
              <ArrowDropDown />
              see more experiences
            </>
          }
        </Typography>
      );
    }
  }

  const lastIndex = seeMore ? employmentHistories.length : 2;

  return (
    <InfoContainer title='Professional Experience'>
      {employmentHistories.slice(0).reverse().map(
        (employment, index) => {
          if (index < lastIndex) {
            return (
              <InfoContent key={index} footer={getFooter(employment)}>
                {`${employment.title} @ ${employment.companyName}`}
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