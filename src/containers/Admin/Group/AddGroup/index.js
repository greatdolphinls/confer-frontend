
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as GROUP_SERVICE from '../../../../services/group';
import { addEditGroup } from '../../../../actions';
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

const AdminAddGroup = ({ classes, match, history }) => {
  const dispatch = useDispatch();

  const name = useInput('');
  const password = useInput('');
  const logo = useInput('');
  const [expanded, setExpanded] = useState('profilePanel');
  const [editPanel, setEditPanel] = useState('profilePanel');
  const [showDialog, setShowDialog] = useState(false);

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
        name: name.value,
        password: password.value,
        viewPassword: password.value,
        logo: logo.value
      };

      const { data } = await GROUP_SERVICE.addGroup(groupData);
      dispatch(addEditGroup(data));
      history.push(pageLinks.AdminGroupList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const deleteHandler = () => {
    name.onSet('');
    password.onSet('');
    logo.onSet('');
    setEditPanel(false);
    setShowDialog(false);
  }

  const openConfirmDialogHandler = () => {
    if (!!name.value || !!password.value || !!logo.value) {
      setShowDialog(true);
    }
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
  }

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
};

export default withStyles(styles)(AdminAddGroup);
