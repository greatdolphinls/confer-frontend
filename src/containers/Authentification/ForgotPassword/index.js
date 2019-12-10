import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as AUTH_SERVICE from '../../../services/auth';
import { setLoadingStatus } from '../../../actions';
import { pageLinks } from '../../../constants/links';
import { ForgotPasswordLayout } from '../Shared';
import { useInput } from '../../../utils/hooks';
import { showErrorToast, showInfoToast } from '../../../utils/utility';
import notifications from '../../../constants/notifications';
import { PrimaryButton } from '../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
    button: {
      width: 'fit-content',
      marginBottom: theme.spacing(1)
    }
  };
};

const ForgotPassword = ({ classes, history }) => {
  const dispatch = useDispatch();
  const email = useInput('');

  const submitHandler = async () => {
    await dispatch(setLoadingStatus({
      loading: true,
      text: 'Sending Reset Email...'
    }));
    try {
      const data = {
        email: email.value,
        host: window.location.origin
      }

      const { data: { message } } = await AUTH_SERVICE.forgotPassword(data);
      showInfoToast(message);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        history.push(pageLinks.SignUp.url);
        showErrorToast(message || notifications.NO_RESPONSE);
      }
    }
    await dispatch(setLoadingStatus({ loading: false }));
  };

  return (
    <ForgotPasswordLayout>
      <ValidatorForm
        className={classes.root}
        onSubmit={submitHandler}
        onError={errors => console.log(errors)}>
        <TextValidator
          fullWidth
          name='email'
          label='Email Address'
          className={classes.input}
          value={email.value}
          onChange={email.onChange}
          validators={['isEmail', 'required']}
          errorMessages={['Email is not valid', 'Email cannot be empty']} />
        <PrimaryButton
          fullWidth
          classes={{ root: classes.button }}
          type='submit'>
          RESET PASSWORD
        </PrimaryButton>
      </ValidatorForm>
    </ForgotPasswordLayout>
  );
};

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ForgotPassword);
