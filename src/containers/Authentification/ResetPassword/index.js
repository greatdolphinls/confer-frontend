import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { resetPassword, clearErrors, setLoadingStatus } from '../../../actions';
import { ForgotPasswordLayout } from '../Shared';
import { PrimaryButton } from '../../../components';
import { useInput } from '../../../utils/hooks';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';

const styles = theme => {
  return {
    root: {},
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
    button: {
      marginBottom: theme.spacing(1)
    }
  };
};

const ResetPassword = ({ classes, match, history, resetPassword, clearErrors, setLoadingStatus }) => {
  const password = useInput('');
  const confirmPassword = useInput('');

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== password.value) {
      return false;
    }
    return true;
  });

  const submitHandler = () => {
    const token = match.params.token;
    const data = {
      resetPasswordToken: token,
      password: password.value,
      confirmPassword: confirmPassword.value
    }

    clearErrors();
    setLoadingStatus({
      loading: true,
      text: 'Loading ...'
    });
    resetPassword(data, successCallback, errorCallback);
  };

  const successCallback = message => {
    setLoadingStatus({ loading: false });
    history.replace(pageLinks.SuccessResetPassword.url);
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  const errorCallback = (response, message) => {
    setLoadingStatus({ loading: false });
    toast.error(message || notifications.NO_RESPONSE, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  return (
    <ForgotPasswordLayout>
      <ValidatorForm
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
          validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,}']}
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
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorStatus: state.errors.errorStatus
});

const mapActionToProps = {
  resetPassword,
  clearErrors,
  setLoadingStatus
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ResetPassword));
