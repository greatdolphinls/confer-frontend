
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as CANDIDATE_SERVICE from '../../../services/candidate';
import { registerCandidate, setLoadingStatus } from '../../../actions';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import { PrimaryButton } from '../../../components';
import { CandidateLayout } from '../Shared';
import { useInput } from '../../../utils/hooks';
import { showErrorToast, showInfoToast, isEmpty } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(5)
    },
    container: {
      width: 340,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
  };
};

const CandidateSignup = ({ classes, match, history }) => {
  const dispatch = useDispatch();
  const password = useInput('');

  useEffect(() => {
    getCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCandidate = async () => {
    const candidateId = match.params.candidateId;
    const { data } = await CANDIDATE_SERVICE.getCandidate(candidateId);
    if (isEmpty(data)) {
      showErrorToast(notifications.CANDIDATE_SIGNUP_LINK_ERROR);
      history.push(pageLinks.SignIn.url);
    }
  }

  const submitHandler = async () => {
    const data = {
      _id: match.params.candidateId,
      password: password.value
    }

    await dispatch(setLoadingStatus({
      loading: true,
      text: 'Sign Up ...'
    }));
    await dispatch(registerCandidate(data, successCallback, errorCallback));
  }

  const successCallback = () => {
    dispatch(setLoadingStatus({ loading: false }));
    history.replace(pageLinks.CandidateGenerateProfile.url);
    showInfoToast(notifications.SIGN_UP_SUCCESS);
  };

  const errorCallback = error => {
    dispatch(setLoadingStatus({ loading: false }));

    if (!error.response) {
      showErrorToast(notifications.NO_RESPONSE);
    } else {
      const { data: { message } } = error.response;
      showErrorToast(message || notifications.NO_RESPONSE);
    }
  };

  return (
    <main className={classes.root}>
      <CandidateLayout
        title='Create a password to sign up.'>
        <ValidatorForm
          className={classes.container}
          onSubmit={submitHandler}
          onError={errors => console.log(errors)}>
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
          <PrimaryButton type='submit'>
            SIGN UP
          </PrimaryButton>
        </ValidatorForm>
      </CandidateLayout>
    </main>
  );
};

CandidateSignup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CandidateSignup);
