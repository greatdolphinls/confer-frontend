import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import * as USER_SERVICE from '../../../services/user';
import {
  setCurrentProfile,
  editCurrentProfile,
  editCurrentUserInfo,
  setLocations,
  setSearches,
  setPositions,
  setIndustries
} from '../../../actions';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import {
  BasicPanel,
  PreferencePanel,
  ExperiencePanel,
  EducationPanel
} from '../../../components';
import { EditControlButtons, CandidateLayout } from '../Shared';
import { showErrorToast, showInfoToast } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1)
      }
    },
    controlButton: {
      marginTop: theme.spacing(4)
    }
  };
};

const CandidateEditProfile = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const { profile } = useSelector(state => state.auth, {});
  const searchOptions = useSelector(state => state.search.options, []);
  const positionOptions = useSelector(state => state.position.options, []);
  const industriesOptions = useSelector(state => state.industry.options, []);
  const locationOptions = useSelector(state => state.location.options, []);
  const dispatch = useDispatch();

  const [editPanel, setEditPanel] = useState(false);
  const [tempProfile, setTempProfile] = useState({});

  useEffect(() => {
    dispatch(setCurrentProfile());
    dispatch(setLocations());
    dispatch(setSearches());
    dispatch(setPositions());
    dispatch(setIndustries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user.isReferrer || !user.isCandidate) {
      history.push(pageLinks.RecommendCount.url);
    }

    if (!user.isProfile) {
      history.push(pageLinks.CandidateGenerateProfile.url);
    }

    if (!user.isFetch) {
      history.push(pageLinks.ProfileOverview.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  useEffect(() => {
    setTempProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);


  const onBackHandler = () => {
    history.push(pageLinks.ProfileOverview.url);
  }

  const onSaveHandler = async () => {
    try {
      const { data } = await USER_SERVICE.editUser(tempProfile);
      await dispatch(editCurrentProfile(data));
      await dispatch(editCurrentUserInfo({ avatar: data.avatar }))
      showInfoToast(notifications.SUCCESS_UPDATE_PROFILE);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const editHandler = (panel) => {
    setEditPanel(panel);
  }

  const onFieldChangeHandler = (name) => async (event) => {
    let value = event;
    if (!!event) {
      value = !!event.target ? event.target.value : event;
    }

    let data = {
      ...tempProfile,
      [name]: value
    }

    setTempProfile(data);
  }

  const onFieldChangeAndSaveHandler = (name) => async (value) => {
    const userData = {
      ...tempProfile,
      [name]: value
    };

    try {
      const { data } = await USER_SERVICE.editUser(userData);
      setTempProfile(data);
      dispatch(editCurrentProfile(data));
      showInfoToast(notifications.SUCCESS_UPDATE_PROFILE);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  return (
    <main className={classes.root}>
      <CandidateLayout
        title='Edit My Profile' >
        <EditControlButtons
          classes={{ root: classes.controlButton }}
          backLabel='back to profile'
          onBack={onBackHandler}
          onSave={onSaveHandler} />
        <BasicPanel
          user={tempProfile}
          locations={locationOptions}
          editPanel={editPanel}
          onEdit={editHandler}
          onChange={onFieldChangeHandler} />
        <PreferencePanel
          user={tempProfile}
          searches={searchOptions}
          positions={positionOptions}
          industries={industriesOptions}
          locations={locationOptions}
          editPanel={editPanel}
          onEdit={editHandler}
          onChange={onFieldChangeHandler} />
        <ExperiencePanel
          employmentHistories={tempProfile.employmentHistories}
          onChange={onFieldChangeAndSaveHandler('employmentHistories')} />
        <EducationPanel
          educationHistories={tempProfile.educationHistories}
          onChange={onFieldChangeAndSaveHandler('educationHistories')} />
      </CandidateLayout>
    </main>
  );
};

CandidateEditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CandidateEditProfile);
