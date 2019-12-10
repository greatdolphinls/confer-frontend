
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import * as USER_SERVICE from '../../../services/user';
import {
  setSearches,
  setPositions,
  setLocations,
  setIndustries,
  editCurrentUserInfo
} from '../../../actions';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import companySizes from '../../../constants/companySizes';
import { 
  PrimaryButton, 
  CustomMultiSelect,
  CustomSingleSelect,
  CustomLimitMultiSelect,
  CustomLimitMultiAutocomplete 
} from '../../../components';
import { CandidateLayout } from '../Shared';
import { useInput } from '../../../utils/hooks';
import { showErrorToast, showInfoToast } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(5)
    },
    header: {
      width: 820,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    container: {
      width: 540,
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    subContainer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(3)
    },
    description: {
      fontSize: 16,
      marginRight: theme.spacing(2)
    },
    smallInput: {
      width: 240,
      fontSize: 16,
      margin: 0,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    largeInput: {
      width: '100%',
      fontSize: 16,
      margin: 0
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(2)
    },
    skipButton: {
      opacity: 0.6,
      fontSize: 12,
      cursor: 'pointer',
      textAlign: 'center',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(5)
    }
  };
};

const CandidateGenerateProfile = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const searchOptions = useSelector(state => state.search.options, []);
  const positionOptions = useSelector(state => state.position.options, []);
  const industriesOptions = useSelector(state => state.industry.options, []);
  const locationOptions = useSelector(state => state.location.options, []);
  const dispatch = useDispatch();

  const searchStatus = useInput('');
  const preferenceRole = useInput('');
  const preferenceCompanySize = useInput([]);
  const interestedPosition = useInput([]);
  const preferenceIndustry = useInput([]);
  const preferenceLocationPref = useInput([]);
        
  useEffect(() => {
    if(!user.isReferrer || !user.isCandidate){
      history.push(pageLinks.RecommendCount.url);
    }

    if(user.isProfile){
      history.push(pageLinks.ProfileOverview.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
        
  useEffect(() => {
    dispatch(setSearches());
    dispatch(setPositions());
    dispatch(setLocations());
    dispatch(setIndustries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateButtonHandler = async () => {
    try {
      const data = {
        _id: user.id,
        isProfile: true,
        searchStatus: searchStatus.value,
        preferenceRole: preferenceRole.value,
        preferenceCompanySize: preferenceCompanySize.value,
        interestedPosition: interestedPosition.value,
        preferenceIndustry: preferenceIndustry.value,
        preferenceLocationPref: preferenceLocationPref.value
      };

      await USER_SERVICE.generateProfile(data);
      await dispatch(editCurrentUserInfo({isProfile: true}))
      history.push(pageLinks.ProfileOverview.url);
      showInfoToast(notifications.GENERATE_PROFILE_SUCCESS);
    } catch (error) {
      // TODO: axios handling module
      console.log('great dolphin : [containers CandidateCreateProfile generateButtonHandler] error => ', error);
      if (error.response) {
        const { message: errorMessage } = error.response.data;
        showErrorToast(errorMessage);
      }
    }
  }

  const skipButtonHandler = async () => {
    try {
      const data = {
        _id: user.id,
        isProfile: true
      };

      await USER_SERVICE.generateProfile(data);
      await dispatch(editCurrentUserInfo({isProfile: true}))
      history.push(pageLinks.ProfileOverview.url);
    } catch (error) {
      // TODO: axios handling module
      console.log('great dolphin : [containers CandidateCreateProfile skipButtonHandler] error => ', error);
      if (error.response) {
        const { message: errorMessage } = error.response.data;
        showErrorToast(errorMessage);
      }
    }
  }

  const searchStatusContainerRender = () => {
    return (
      <div className={classes.subContainer}>
        <Typography className={classes.description}>
          I am currently
        </Typography>
        <CustomSingleSelect
          placeholder='Select one'
          classes={{ root: classes.smallInput }}
          value={searchStatus.value}
          changed={searchStatus.onChange}
          items={searchOptions} />
      </div>
    );
  }

  const preferenceRoleContainerRender = () => {
    return (
      <div className={classes.subContainer}>
        <Typography className={classes.description}>
          In my next role I am looking to
        </Typography>
        <TextField
          multiline={true}
          name='PreferenceRole'
          placeholder='[share briefly what you want in your next role]'
          className={classes.largeInput}
          value={preferenceRole.value}
          onChange={preferenceRole.onChange} />
      </div>
    );
  }

  const companySizeContainerRender = () => {
    return (
      <div className={classes.subContainer}>
        <Typography className={classes.description}>
          I want to work for a company with
        </Typography>
        <CustomMultiSelect
          placeholder='Select all that apply'
          classes={{ root: classes.smallInput }}
          value={preferenceCompanySize.value}
          changed={preferenceCompanySize.onChange}
          items={companySizes} />
      </div>
    );
  }

  const preferenceIndustryContainerRender = () => {
    return (
      <div className={classes.subContainer}>
        <Typography className={classes.description}>
          in industries such as
        </Typography>
        <CustomLimitMultiSelect
          limit={3}
          placeholder='Select up to 3 industries'
          classes={{ root: classes.smallInput }}
          value={preferenceIndustry.value}
          changed={preferenceIndustry.onChange}
          items={industriesOptions} />
      </div>
    );
  }

  const preferenceLocationPrefContainerRender = () => {
    return (
      <div className={classes.subContainer}>
        <Typography className={classes.description}>
          based in
        </Typography>
        <CustomLimitMultiAutocomplete
          limit={3}
          placeholder='Select up to 3 cities'
          classes={{ root: classes.smallInput }}
          value={preferenceLocationPref.value}
          onChange={preferenceLocationPref.onChange}
          options={locationOptions} />
      </div>
    );
  }

  const interestedPositionContainerRender = () => {
    return (
      <div className={classes.subContainer}>
        <Typography className={classes.description}>
          Lastly, I would be open to
        </Typography>
        <CustomMultiSelect
          placeholder='Select all that apply'
          classes={{ root: classes.smallInput }}
          value={interestedPosition.value}
          changed={interestedPosition.onChange}
          items={positionOptions} />
      </div>
    );
  }

  return (
    <main className={classes.root}>
      <CandidateLayout 
        classes={{title: classes.header}}
        title='We want to showcase your profile to the most relevant employers.
        To help us, please share a little bit about your career aspirations.'>
        <div className={classes.container}>
          {searchStatusContainerRender()}
          {preferenceRoleContainerRender()}
          {companySizeContainerRender()}
          {preferenceIndustryContainerRender()}
          {preferenceLocationPrefContainerRender()}
          {interestedPositionContainerRender()}
          <div className={classes.buttonContainer}>
            <PrimaryButton onClick={generateButtonHandler}>
              Submit & Generate My Profile
            </PrimaryButton>
            <Typography
              className={classes.skipButton}
              onClick={skipButtonHandler} >
              Skip & Generate My Profile
            </Typography>
          </div>
        </div>
      </CandidateLayout>
    </main>
  );
};

CandidateGenerateProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CandidateGenerateProfile);
