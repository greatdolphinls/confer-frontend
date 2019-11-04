import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';

import * as MAILER_SERVICE from '../../../../services/mailer';
import { HomeEmailInput, HomeButton } from '..';
import notifications from '../../../../constants/notifications'
import { useInput } from '../../../../utils/hooks';
import { showErrorToast, showInfoToast } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 6,
      backgroundColor: theme.palette.lightBrownBackColor,
      margin: `${theme.spacing(4)}px 0`,
      padding: theme.spacing(6),
      [theme.breakpoints.down('xs')]: {
        margin: `${theme.spacing(2)}px 0`,
        padding: theme.spacing(3)
      }
    },
    title: {
      fontSize: 24,
      fontFamily: 'Moret',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        fontSize: 22
      }
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }
  };
};

const HomeKnowGreat = ({ classes }) => {
  const email = useInput('');

  const requestHandler = () => {
    try {
      const data = {
        email: email.value
      }
      MAILER_SERVICE.requestSignup(data);
      showInfoToast(notifications.HOME_REQUEST_EMAIL_SUCCESS)
    } catch (error) {
      showErrorToast(notifications.HOME_REQUEST_EMAIL_ERROR)
    }
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        KNOW SOMEONE GREAT?
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
          name='SIGN UP TO RECOMMEND THEM'
        />
      </ValidatorForm>
    </main >
  );
};

HomeKnowGreat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeKnowGreat);
