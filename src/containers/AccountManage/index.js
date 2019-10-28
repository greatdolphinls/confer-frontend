
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as USER_SERVICE from '../../services/user';
import { setLoadingStatus, editCurrentUserInfo } from '../../actions';
import notifications from '../../constants/notifications';
import { PrimaryButton } from '../../components';
import { AccountLayout } from './shared';
import { useInput } from '../../utils/hooks';
import { showErrorToast, showInfoToast } from '../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(5)
    },
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      width: '50%',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    button: {
      width: 176,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  };
};

const AccountManage = ({ classes, defaultUser }) => {
  const { user } = useSelector(state => state.auth, []);
  const dispatch = useDispatch();

  const [tempUser, setTempUser] = useState(defaultUser);
  const currentPassword = useInput('');
  const newPassword = useInput('');
  const confirmPassword = useInput('');

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== newPassword.value) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    setTempUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const initPasswordFields = () => {
    currentPassword.onSet('');
    newPassword.onSet('');
    confirmPassword.onSet('');
  }

  const onFieldChangeHandler = async (event) => {
    const data = {
      ...tempUser,
      [event.target.name]: event.target.value
    }

    setTempUser(data);
  }

  const accountSubmitHandler = async () => {
    const data = {
      user: {
        email: tempUser.email,
        firstName: tempUser.firstName,
        lastName: tempUser.lastName
      }
    }

    setLoadingStatus({ loading: true, text: 'Updating ...' });
    try {
      const result = await USER_SERVICE.updateMyInfo(tempUser.id, data);
      dispatch(editCurrentUserInfo(result.data));
      showInfoToast(notifications.SUCCESS_UPDATE_PROFILE);
    } catch (error) {
      const { message } = error.response.data;
      showErrorToast(message);
    }
    setLoadingStatus({ loading: false });
  }

  const changePasswordHandler = async () => {
    const data = {
      user: {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value
      }
    }

    setLoadingStatus({ loading: true, text: 'Changing Password...' });
    try {
      await USER_SERVICE.updateMyInfo(tempUser.id, data);
      initPasswordFields();
      showInfoToast(notifications.SUCCESS_UPDATE_PASSWORD);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      } else {
        showErrorToast(notifications.FAIL_UPDATE_PASSWORD);
      }
    }
    setLoadingStatus({ loading: false });
  }

  const accountDetailRender = () => {
    return (
      <AccountLayout
        title='Your account details' >
        <ValidatorForm
          className={classes.container}
          onSubmit={accountSubmitHandler}
          onError={errors => console.log(errors)}>
          <TextValidator
            fullWidth
            name='email'
            label='Email Address'
            className={classes.input}
            value={tempUser.email}
            onChange={onFieldChangeHandler}
            validators={['isEmail', 'required']}
            errorMessages={['Email is not valid', 'Email cannot be empty']} />
          <TextValidator
            fullWidth
            name='firstName'
            label='First Name'
            className={classes.input}
            value={tempUser.firstName}
            onChange={onFieldChangeHandler}
            validators={['required']}
            errorMessages={['First Name cannot be empty']} />
          <TextValidator
            fullWidth
            name='lastName'
            label='Last Name'
            className={classes.input}
            value={tempUser.lastName}
            onChange={onFieldChangeHandler}
            validators={['required']}
            errorMessages={['Last Name cannot be empty']} />
          <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
            Update
          </PrimaryButton>
        </ValidatorForm>
      </AccountLayout>
    )
  }

  const changePasswordRender = () => {
    return (
      <AccountLayout
        title='Your password' >
        <ValidatorForm
          className={classes.container}
          onSubmit={changePasswordHandler}
          onError={errors => console.log(errors)}>
          <TextValidator
            fullWidth
            type='password'
            name='currentPassword'
            label='Current Password'
            className={classes.input}
            value={currentPassword.value}
            onChange={currentPassword.onChange}
            validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,}']}
            errorMessages={['Current Password cannot be empty', 'Password must contain at least 6 characters']} />
          <TextValidator
            fullWidth
            type='password'
            name='newPassword'
            label='New Password'
            className={classes.input}
            value={newPassword.value}
            onChange={newPassword.onChange}
            validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,}']}
            errorMessages={['New Password cannot be empty', 'Password must contain at least 6 characters']} />
          <TextValidator
            fullWidth
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            className={classes.input}
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
            validators={['isPasswordMatch', 'required']}
            errorMessages={['Password mismatch', 'Confirm Password is required']} />
          <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
            Change Password
          </PrimaryButton>
        </ValidatorForm>
      </AccountLayout>
    )
  }

  return (
    <main className={classes.root}>
      {accountDetailRender()}
      {changePasswordRender()}
      {/* <ValidatorForm
        onSubmit={accountSubmitHandler}
        onError={errors => console.log(errors)}>
        <TextValidator
          fullWidth
          name='email'
          label='Email Address'
          className={classes.input}
          value={user.value}
          onChange={user.onChange}
          validators={['isEmail', 'required']}
          errorMessages={['Email is not valid', 'Email cannot be empty']} />
        <TextValidator
          fullWidth
          name='firstName'
          label='First Name'
          className={classes.input}
          value={firstName.value}
          onChange={firstName.onChange}
          validators={['required']}
          errorMessages={['First Name cannot be empty']} />
        <TextValidator
          fullWidth
          name='lastName'
          label='Last Name'
          className={classes.input}
          value={lastName.value}
          onChange={lastName.onChange}
          validators={['required']}
          errorMessages={['Last Name cannot be empty']} />
        <TextValidator
          fullWidth
          name='password'
          label='Password'
          type='password'
          className={classes.input}
          value={password.value}
          onChange={password.onChange}
          validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,}']}
          errorMessages={['Password cannot be empty', 'Password must contain at least 6 characters']} />
        <TextValidator
          fullWidth
          name='groupPassword'
          label='Group Password'
          type='password'
          className={classes.input}
          value={groupPassword.value}
          onChange={groupPassword.onChange}
          validators={['required']}
          errorMessages={['Group Password cannot be empty']} />
        <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
          Sign Up
        </PrimaryButton>
      </ValidatorForm> */}
    </main>
  );
};

AccountManage.propTypes = {
  classes: PropTypes.object.isRequired
};

AccountManage.defaultProps = {
  defaultUser: {
    email: '',
    firstName: '',
    lastName: ''
  }
};

export default withStyles(styles)(AccountManage);
