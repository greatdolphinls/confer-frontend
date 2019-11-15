import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { ValidatorForm } from 'react-material-ui-form-validator';

import * as REGISTER_SERVICE from '../../../../services/register';
import { HomeEmailInput, HomeButton } from '..';
import notifications from '../../../../constants/notifications'
import { useInput } from '../../../../utils/hooks';
import { showErrorToast, showInfoToast } from '../../../../utils/utility';
import LeftImage from '../../../../assets/img/background/homeRecognizeLeft.png';
import RightImage from '../../../../assets/img/background/homeRecognizeRight.png';

const styles = theme => {
  return {
    root: {
      height: 810,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      margin: `${theme.spacing(2)}px 0`,
      padding: `${theme.spacing(5)}px 0`,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        height: 600
      }
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      zIndex: 2
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 32,
        lineHeight: '45px'
      }
    },
    subTitle: {
      width: 390,
      fontSize: 20,
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
        width: '100%'
      }
    },
    footerContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      zIndex: 2
    },
    description: {
      width: 420,
      fontSize: 38,
      lineHeight: '45px',
      fontFamily: 'Moret',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        lineHeight: '32px',
        fontSize: 28
      },
      '& span': {
        fontFamily: 'Moret',
        backgroundImage: `linear-gradient(180deg, ${theme.palette.mainBackColor} 50%, ${theme.palette.sandBackColor} 100%)`
      }
    },
    subDescription: {
      fontSize: 14
    },
    leftImage: {
      width: '35%',
      position: 'absolute',
      top: 0,
      left: 0,
      [theme.breakpoints.down('xs')]: {
        top: 180
      }
    },
    rightImage: {
      width: '35%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      [theme.breakpoints.down('xs')]: {
        bottom: 90
      }
    }
  };
};

const HomeHeader = ({ classes }) => {
  const email = useInput('');

  const requestHandler = async () => {
    try {
      const data = {
        email: email.value
      }
      await REGISTER_SERVICE.addRegister(data);
      await showInfoToast(notifications.HOME_REQUEST_EMAIL_SUCCESS)
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      } else {
        showErrorToast(notifications.HOME_REQUEST_EMAIL_ERROR)
      }
    }
  }

  return (
    <main className={classes.root}>
      <div className={classes.headerContainer}>
        <Typography className={classes.title}>
          Let talent recognize talent.
        </Typography>
        <Typography className={classes.subTitle}>
          Stop sifting through resumes and discover top talent
          recommended by your peers.
        </Typography>
        <ValidatorForm
          className={classes.form}
          onSubmit={requestHandler}
          onError={errors => console.log(errors)}>
          <HomeEmailInput
            name='email'
            value={email.value}
            onChange={email.onChange}
          />
          <HomeButton
            type='submit'
            name='REQUEST TO RECOMMEND'
          />
        </ValidatorForm>
        <KeyboardArrowDown />
      </div>
      <div className={classes.footerContainer}>
        <Typography className={classes.description}>
          {'“She is brilliant analytically, among the '}
          <span>best strategists</span>
          {' I have ever worked with.”'}
        </Typography>
        <Typography>
          -MARK GERSON, CO-FOUNDER OF GLG
        </Typography>
      </div>
      <img
        src={LeftImage}
        className={classes.leftImage}
        alt='leftImage' />
      <img
        src={RightImage}
        className={classes.rightImage}
        alt='rightImage' />
    </main>
  );
};

HomeHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeHeader);
