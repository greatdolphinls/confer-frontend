
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as USER_SERVICE from '../../../../services/user';
import {
  addEditUser,
  setLocations,
  setExpertises
} from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import notifications from '../../../../constants/notifications';
import {
  AccordionLayout,
  ConfirmDialog,
  NotFound
} from '../../../../components';
import { BasicProfilePanel } from '../Shared';
import { showErrorToast } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing(6)
    }
  };
};

const AdminAddUser = ({ classes, panel, history }) => {
  const locations = useSelector(state => state.location.data, []);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(panel);
  const [editPanel, setEditPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState({});
  const [locationOptions, setLocationOptions] = useState({});

  useEffect(() => {
    dispatch(setLocations());
    dispatch(setExpertises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const locationsData = locations.map(({ name }) => ({ label: name, value: name }));
    setLocationOptions(locationsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

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
    if (!user.firstName || !user.lastName || !user.email) {
      showErrorToast(notifications.ADD_USER_VALODATION_ERROR);
      return null;
    }

    try {
      const { data } = await USER_SERVICE.addUser(user);
      dispatch(addEditUser(data));
      history.push(pageLinks.AdminEditUser.url.replace(':userId', data._id));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const onFieldChangeHandler = (name) => async (event) => {
    const data = {
      ...user,
      [name]: !!event.target ? event.target.value : event
    }

    setUser(data);
  }

  const deleteHandler = async () => {
    setUser({});
    setEditPanel(false);
    setShowDialog(false);
  }

  const openConfirmDialogHandler = () => {
    setShowDialog(true);
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
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
        <AccordionLayout
          title='BASIC PROFILE'
          panel={panel}
          onExpand={expandHandler}
          selectedPanel={expanded}>
          <BasicProfilePanel
            locations={locationOptions}
            user={user}
            editPanel={editPanel}
            onEdit={editHandler}
            onChange={onFieldChangeHandler} />
        </AccordionLayout>
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

AdminAddUser.defaultProps = {
  panel: 'basicProfilePanel'
};

export default withStyles(styles)(AdminAddUser);