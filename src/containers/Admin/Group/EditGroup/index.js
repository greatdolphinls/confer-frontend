
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as GROUP_SERVICE from '../../../../services/group';
import { setGroups, removeGroup, addEditGroup } from '../../../../actions';
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

const AdminEditGroup = ({ classes, match, history }) => {
  const groups = useSelector(state => state.group.data, []);
  const dispatch = useDispatch();

  const name = useInput('');
  const password = useInput('');
  const logo = useInput('');
  const [expanded, setExpanded] = useState('profilePanel');
  const [editPanel, setEditPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [group, setGroup] = useState({});

  useEffect(() => {
    dispatch(setGroups());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const groupId = match.params.groupId;
    const selectedGroup = groups.find(group => group._id === groupId);
    setGroup(selectedGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  useEffect(() => {
    if (!!group) {
      name.onSet(group.name);
      password.onSet(group.viewPassword);
      logo.onSet(group.logo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  const expandHandler = panel => {
    setExpanded(panel);
  };

  const editHandler = (panel) => {
    setEditPanel(panel);
  }

  const backHandler = () => {
    history.push(pageLinks.AdminGroupList.url);
  }

  const saveHandler = async () => {
    if (!name.value || !password.value) {
      showErrorToast(notifications.FORM_VALODATION_ERROR);
      return null;
    }

    try {
      const groupData = {
        _id: group._id,
        name: name.value,
        password: password.value,
        viewPassword: password.value,
        logo: logo.value
      };

      const { data } = await GROUP_SERVICE.editGroup(groupData);
      dispatch(addEditGroup(data));
      history.push(pageLinks.AdminGroupList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await GROUP_SERVICE.removeGroup(group._id);
      dispatch(removeGroup(data));
      history.push(pageLinks.AdminGroupList.url);
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

  if (!!group) {
    return (
      <main className={classes.root}>
        <ControlButtons
          backLabel='back to all groups'
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
            label='Group name'
            value={name.value}
            onChange={name.onChange}
          />
          <EditableInput
            isEdit={'profilePanel' === editPanel}
            label='Group password'
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
        NOT FOUND GROUP
      </Typography>
    );
  }
};

export default withStyles(styles)(AdminEditGroup);
