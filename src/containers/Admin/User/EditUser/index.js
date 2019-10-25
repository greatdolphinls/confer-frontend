
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as USER_SERVICE from '../../../../services/user';
import {
  setUsers,
  removeUser,
  addEditUser,
  setLocations,
  setExpertises
} from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import {
  AccordionLayout,
  ConfirmDialog,
  NotFound
} from '../../../../components';
import {
  BasicProfilePanel,
  PreferencePanel,
  ExperiencePanel,
  EducationPanel,
  GroupAccessPanel
} from '../Shared';
import { showErrorToast, isEmpty } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing(6)
    }
  };
};

const AdminEditUser = ({ classes, match, history }) => {
  const users = useSelector(state => state.user.data, []);
  const locations = useSelector(state => state.location.data, []);
  const expertises = useSelector(state => state.expertise.data, []);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState('basicProfilePanel');
  const [editPanel, setEditPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState({});
  const [locationOptions, setLocationOptions] = useState({});
  const [expertiseOptions, setExpertiseOptions] = useState({});
  const [subExpertiseOptions, setSubExpertiseOptions] = useState([]);

  useEffect(() => {
    dispatch(setUsers());
    dispatch(setLocations());
    dispatch(setExpertises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const userId = match.params.userId;
    const selectedUser = users.find(user => user._id === userId);
    setUser(selectedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

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
    if (!isEmpty(user) && !isEmpty(expertises)) {
      const selectedExpertise = expertises.find(expertise => expertise.name === user.primaryExpertise);
      let subExpertisesData = []
      if (!isEmpty(selectedExpertise)) {
        subExpertisesData = selectedExpertise.subExpertises.map((name) => ({ label: name, value: name }));
      }
      setSubExpertiseOptions(subExpertisesData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, expertises]);

  const expandHandler = panel => {
    setExpanded(panel);
  };

  const editHandler = (panel) => {
    setEditPanel(panel);
  }

  const backHandler = () => {
    history.push(pageLinks.AdminUserList.url);
  }

  const saveHandler = async () => {
    try {
      const { data } = await USER_SERVICE.editUser(user);
      dispatch(addEditUser(data));
      history.push(pageLinks.AdminUserList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const onFieldChangeHandler = (name) => async (event) => {
    let value = !!event.target ? event.target.value : event;

    if (name === 'role') {
      value = parseInt(value, 10);
    }

    let data = {
      ...user,
      [name]: value
    }

    if (name === 'primaryExpertise') {
      data = {
        ...data,
        subExpertises: []
      }
    }

    setUser(data);
  }

  const onFieldChangeAndSaveHandler = (name) => async (value) => {
    const userData = {
      ...user,
      [name]: value
    };

    try {
      const { data } = await USER_SERVICE.editUser(userData);
      setUser(data);
      dispatch(addEditUser(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await USER_SERVICE.removeUser(user._id);
      dispatch(removeUser(data));
      history.push(pageLinks.AdminUserList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const openConfirmDialogHandler = () => {
    setShowDialog(true);
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
  }

  const basicProfileRender = () => {
    return (
      <AccordionLayout
        title='BASIC PROFILE'
        panel='basicProfilePanel'
        onExpand={expandHandler}
        selectedPanel={expanded}>
        <BasicProfilePanel
          locations={locationOptions}
          user={user}
          editPanel={editPanel}
          onEdit={editHandler}
          onChange={onFieldChangeHandler} />
      </AccordionLayout>
    )
  };

  const detailProfileRender = () => {
    return (
      <AccordionLayout
        title='PROFILE DETAIL'
        panel='detailProfilePanel'
        onExpand={expandHandler}
        selectedPanel={expanded}>
        <PreferencePanel
          user={user}
          locations={locationOptions}
          expertises={expertiseOptions}
          subExpertises={subExpertiseOptions}
          editPanel={editPanel}
          onEdit={editHandler}
          onChange={onFieldChangeHandler} />
        <ExperiencePanel
          employmentHistories={user.employmentHistories}
          onChange={onFieldChangeAndSaveHandler('employmentHistories')} />
        <EducationPanel
          educationHistories={user.educationHistories}
          onChange={onFieldChangeAndSaveHandler('educationHistories')} />
        <GroupAccessPanel
          groups={user.groups}
          onChange={onFieldChangeAndSaveHandler('groups')} />
      </AccordionLayout>
    );
  }

  if (!!user) {
    return (
      <main className={classes.root}>
        <ControlButtons
          backLabel='back to all profiles'
          onBack={backHandler}
          onSave={saveHandler}
          onDelete={openConfirmDialogHandler}
        />
        {basicProfileRender()}
        {detailProfileRender()}
        {
          showDialog &&
          <ConfirmDialog
            opened={showDialog}
            onClose={closeDialogHandler}
            onConfirm={deleteHandler} />
        }
      </main>
    );
  } else {
    return (
      <NotFound />
    );
  }
};

export default withStyles(styles)(AdminEditUser);
