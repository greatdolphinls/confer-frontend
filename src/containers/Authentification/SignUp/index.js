import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { registerUser, setLoadingStatus } from '../../../actions';
import * as GROUP_SERVICE from '../../../services/group';
import { AuthLayout } from '../Shared';
import { OutlineButton } from '../../../components';
import { useInput } from '../../../utils/hooks';
import { isEmpty, showErrorToast, showInfoToast } from '../../../utils/utility';
import { pageLinks } from '../../../constants/links';
import { roles } from '../../../constants/roles';
import notifications from '../../../constants/notifications';
import GroupImage from '../../../assets/img/defaultLogo.jpg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      marginTop: theme.spacing(4),
      flexDirection: 'column'
    },
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
    button: {
      width: 100,
      marginBottom: theme.spacing(6),
    }
  };
};

const SignUp = ({ classes, match, history }) => {
  const dispatch = useDispatch();
  const email = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const password = useInput('');
  const groupPassword = useInput('');
  const groupId = match.params.group;
  const [group, setGroup] = useState({});

  useEffect(() => {
    getGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGroup = async () => {
    const { data } = await GROUP_SERVICE.getGroup(groupId);
    await setGroup(data);
  }

  const submitHandler = async () => {
    const data = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      groupId,
      groupPassword: groupPassword.value,
      host: window.location.origin
    }

    await dispatch(setLoadingStatus({
      loading: true,
      text: 'Sign Up ...'
    }));
    await dispatch(registerUser(data, successCallback, errorCallback));
  }

  const successCallback = () => {
    dispatch(setLoadingStatus({ loading: false }));
    history.replace(pageLinks.GroundRules.url);
    showInfoToast(notifications.SIGN_UP_SUCCESS);
  };

  const errorCallback = (response, message, status) => {
    dispatch(setLoadingStatus({ loading: false }));
    if (status === 402) {
      history.replace(pageLinks.SignIn.url);
    }
    showErrorToast(message || notifications.NO_RESPONSE);
  };

  return (
    <main className={classes.root}>
      <AuthLayout
        selectedTab='signup'
        groupImage={isEmpty(group) ? '' : group.logo || GroupImage}
        groupName={group.name || ''}
        isCashGroup={group.role !== roles.GROUP_DISCOVER_ROLE}>
        <ValidatorForm
          className={classes.container}
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
            validators={['required', 'matchRegexp:[0-9a-zA-Z\\d!@#$%^&*]{6,}']}
            errorMessages={['Password cannot be empty', 'Password must contain at least 6 characters']} />
          <TextValidator
            fullWidth
            name='groupPassword'
            label='Access code'
            type='password'
            className={classes.input}
            value={groupPassword.value}
            onChange={groupPassword.onChange}
            validators={['required']}
            errorMessages={['Access code cannot be empty']} />
          <OutlineButton
            type='submit'
            classes={{ root: classes.button }}>
            Sign Up
          </OutlineButton>
        </ValidatorForm>
      </AuthLayout>
    </main >
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SignUp);
