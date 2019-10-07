import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { sendResetLink, clearErrors, setLoadingStatus } from '../../../actions';
import { ForgotPasswordLayout } from '../Shared';
import { useInput } from '../../../utils/hooks';
import notifications from '../../../constants/notifications';
import { PrimaryButton } from '../../../components';

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

const ForgotPassword = ({ classes, sendResetLink, clearErrors, setLoadingStatus }) => {
  const email = useInput('');

  const submitHandler = () => {
    const data = {
      email: email.value,
      host: window.location.origin
    }

    clearErrors();
    setLoadingStatus({
      loading: true,
      text: 'Sending Reset Email...'
    });
    sendResetLink(data, successCallback, errorCallback);
  };

  const successCallback = message => {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    setLoadingStatus({ loading: false });
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
          name='email'
          label='Email Address'
          className={classes.input}
          value={email.value}
          onChange={email.onChange}
          validators={['isEmail', 'required']}
          errorMessages={['Email is not valid', 'Email cannot be empty']} />
        <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
          RESET PASSWORD
        </PrimaryButton>
      </ValidatorForm>
    </ForgotPasswordLayout>
  );
};

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  sendResetLink: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorStatus: state.errors.errorStatus
});

const mapActionToProps = {
  sendResetLink,
  clearErrors,
  setLoadingStatus
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ForgotPassword));
