import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as AUTH_SERVICE from '../../../services/auth';
import { setLoadingStatus } from '../../../actions';
import { ForgotPasswordLayout } from '../Shared';
import { PrimaryButton } from '../../../components';
import { useInput } from '../../../utils/hooks';
import { showErrorToast, showInfoToast } from '../../../utils/utility'
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';

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

const ResetPassword = ({ classes, match, history }) => {
  const dispatch = useDispatch();
  const password = useInput('');
  const confirmPassword = useInput('');

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== password.value) {
      return false;
    }
    return true;
  });

  const submitHandler = async () => {
    await dispatch(setLoadingStatus({ loading: true }));
    try {
      const token = match.params.token;
      const data = {
        resetPasswordToken: token,
        password: password.value,
        confirmPassword: confirmPassword.value
      }

      const { data: { message } } = await AUTH_SERVICE.resetPassword(data);
      showInfoToast(message);
      history.replace(pageLinks.SuccessResetPassword.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
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
          name='password'
          label='New Password'
          type='password'
          className={classes.input}
          value={password.value}
          onChange={password.onChange}
          validators={['required', 'matchRegexp:[0-9a-zA-Z\\d!@#$%^&*]{6,}']}
          errorMessages={['Group Password cannot be empty', 'Password must contain at least 6 characters']} />
        <TextValidator
          fullWidth
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          className={classes.input}
          value={confirmPassword.value}
          onChange={confirmPassword.onChange}
          validators={['required', 'isPasswordMatch']}
          errorMessages={['Confirm Password cannot be empty', 'Password does not match']} />
        <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
          RESET PASSWORD
        </PrimaryButton>
      </ValidatorForm>
    </ForgotPasswordLayout>
  );
};

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResetPassword);