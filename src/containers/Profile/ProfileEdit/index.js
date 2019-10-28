import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

import * as USER_SERVICE from '../../../services/user';
import {
  setCurrentProfile,
  editCurrentProfile,
  setLocations,
  setExpertises
} from '../../../actions';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import {
  BasicPanel,
  PreferencePanel,
  ExperiencePanel,
  EducationPanel
} from '../../../components';
import { EditControlButtons } from '../Shared';
import { isEmpty, showErrorToast, showInfoToast } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(5)}px 0`,
      padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`
    }
  };
};

const ProfileEdit = ({ classes, history }) => {
  const { profile } = useSelector(state => state.auth, {});
  const locations = useSelector(state => state.location.data, []);
  const expertises = useSelector(state => state.expertise.data, []);
  const dispatch = useDispatch();

  const [editPanel, setEditPanel] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [locationOptions, setLocationOptions] = useState({});
  const [expertiseOptions, setExpertiseOptions] = useState({});
  const [subExpertiseOptions, setSubExpertiseOptions] = useState([]);

  useEffect(() => {
    dispatch(setCurrentProfile());
    dispatch(setLocations());
    dispatch(setExpertises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTempProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    const locationsData = locations.map(({ name }) => ({ label: name, value: name }));
    setLocationOptions(locationsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  useEffect(() => {
    const expertisesData = expertises.map(({ name }) => ({ label: name, value: name }));
    setExpertiseOptions(expertisesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertises]);

  useEffect(() => {
    if (!isEmpty(tempProfile) && !isEmpty(expertises)) {
      const selectedExpertise = expertises.find(expertise => expertise.name === tempProfile.primaryExpertise);
      let subExpertisesData = []
      if (!isEmpty(selectedExpertise)) {
        subExpertisesData = selectedExpertise.subExpertises.map((name) => ({ label: name, value: name }));
      }
      setSubExpertiseOptions(subExpertisesData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempProfile, expertises]);

  const onBackHandler = () => {
    history.push(pageLinks.ProfileOverview.url);
  }

  const OnSaveHandler = async () => {
    try {
      const { data } = await USER_SERVICE.editUser(tempProfile);
      dispatch(editCurrentProfile(data));
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
    let value = !!event.target ? event.target.value : event;

    let data = {
      ...tempProfile,
      [name]: value
    }

    if (name === 'primaryExpertise') {
      data = {
        ...data,
        subExpertises: []
      }
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
    <Paper className={classes.root}>
      <EditControlButtons
        backLabel='back to profile preview'
        onBack={onBackHandler}
        onSave={OnSaveHandler} />
      <BasicPanel
        user={tempProfile}
        locations={locationOptions}
        editPanel={editPanel}
        onEdit={editHandler}
        onChange={onFieldChangeHandler} />
      <PreferencePanel
        user={tempProfile}
        locations={locationOptions}
        expertises={expertiseOptions}
        subExpertises={subExpertiseOptions}
        editPanel={editPanel}
        onEdit={editHandler}
        onChange={onFieldChangeHandler} />
      <ExperiencePanel
        employmentHistories={tempProfile.employmentHistories}
        onChange={onFieldChangeAndSaveHandler('employmentHistories')} />
      <EducationPanel
        educationHistories={tempProfile.educationHistories}
        onChange={onFieldChangeAndSaveHandler('educationHistories')} />
    </Paper>
  );
};

ProfileEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileEdit);
