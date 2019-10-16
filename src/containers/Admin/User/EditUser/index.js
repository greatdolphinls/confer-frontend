
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as USER_SERVICE from '../../../../services/user';
import { setUsers, removeUser, addEditUser } from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import notifications from '../../../../constants/notifications';
import {
  AccordionLayout,
  ConfirmDialog,
  EditableInput,
  EditableImage
} from '../../../../components';
import { showErrorToast } from '../../../../utils/utility';
import { useInput } from '../../../../utils/hooks';

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
  const dispatch = useDispatch();

  const name = useInput('');
  const password = useInput('');
  const logo = useInput('');
  const [expanded, setExpanded] = useState('profilePanel');
  const [editPanel, setEditPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(setUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const userId = match.params.userId;
    const selectedUser = users.find(user => user._id === userId);
    setUser(selectedUser);
    console.log(selectedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (!!user) {
      name.onSet(user.name);
      password.onSet(user.viewPassword);
      logo.onSet(user.logo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    if (!name.value || !password.value) {
      showErrorToast(notifications.FORM_VALODATION_ERROR);
      return null;
    }

    try {
      const userData = {
        _id: user._id,
        name: name.value,
        password: password.value,
        viewPassword: password.value,
        logo: logo.value
      };

      const { data } = await USER_SERVICE.editUser(userData);
      dispatch(addEditUser(data));
      history.push(pageLinks.AdminUserList.url);
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
          panel='profilePanel'
          isEdit={'profilePanel' === editPanel}
          onEdit={editHandler}
          onExpand={expandHandler}
          selectedPanel={expanded}>
          <EditableInput
            isEdit={'profilePanel' === editPanel}
            label='User name'
            value={name.value}
            onChange={name.onChange}
          />
          <EditableInput
            isEdit={'profilePanel' === editPanel}
            label='User password'
            value={password.value}
            onChange={password.onChange}
          />
          <EditableImage
            isAvatar={false}
            isEdit={'profilePanel' === editPanel}
            label='Logo'
            value={logo.value}
            onChange={logo.onSet}
          />
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
      <Typography>
        NOT FOUND USER
      </Typography>
    );
  }
};

export default withStyles(styles)(AdminEditUser);
