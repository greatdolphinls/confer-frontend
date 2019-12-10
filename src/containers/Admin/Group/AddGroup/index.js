
import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as GROUP_SERVICE from '../../../../services/group';
import { addEditGroup } from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import { groupRoles } from '../../../../constants/roles';
import notifications from '../../../../constants/notifications';
import {
  AccordionLayout,
  EditableLayout,
  ConfirmDialog,
  EditableInput,
  EditableImage,
  EditableSelect
} from '../../../../components';
import { showErrorToast, getGroupRole } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing(6)
    }
  };
};

const AdminAddGroup = ({ classes, panel, history }) => {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(panel);
  const [editPanel, setEditPanel] = useState(panel);
  const [showDialog, setShowDialog] = useState(false);
  const [group, setGroup] = useState({});
  
  const isEdit = useMemo(() => panel === editPanel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [editPanel]);

  const expandHandler = panel => {
    setExpanded(panel);
  };

  const editHandler = (panel) => {
    setEditPanel(panel);
  }

  const backHandler = () => {
    history.push(pageLinks.AdminGroupList.url);
  }

  const onFieldChangeHandler = (name) => async (event) => {
    let value = !!event.target ? event.target.value : event;

    if (name === 'role') {
      value = parseInt(value, 10);
    }

    let data = {
      ...group,
      [name]: value
    }

    if (name === 'viewPassword') {
      data = {
        ...data,
        password: value
      }
    }
    setGroup(data);
  }

  const saveHandler = async () => {
    if (!group.name || !group.viewPassword || !group.role) {
      showErrorToast(notifications.FORM_VALIDATION_ERROR);
      return null;
    }

    try {
      const { data } = await GROUP_SERVICE.addGroup(group);
      await dispatch(addEditGroup(data));
      history.push(pageLinks.AdminGroupList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const deleteHandler = () => {
    setGroup({});
    setEditPanel(false);
    setShowDialog(false);
  }

  const openConfirmDialogHandler = () => {
    if (!!group.name || !!group.viewPassword || !!group.logo) {
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
        panel={panel}
        onExpand={expandHandler}
        selectedPanel={expanded}>
        <EditableLayout
          panel={panel}
          isEdit={isEdit}
          onEdit={editHandler}>
          <EditableInput
            isEdit={isEdit}
            label='Group name'
            value={group.name}
            onChange={onFieldChangeHandler('name')}
          />
          <EditableInput
            isEdit={isEdit}
            label='Group password'
            value={group.viewPassword}
            onChange={onFieldChangeHandler('viewPassword')}
          />
          <EditableSelect
            isEdit={isEdit}
            label='Group Role'
            options={groupRoles}
            value={isEdit ? group.role : getGroupRole(group.role)}
            onChange={onFieldChangeHandler('role')}
          />
          <EditableImage
            isAvatar={false}
            isEdit={isEdit}
            label='Logo'
            value={group.logo}
            onChange={onFieldChangeHandler('logo')}
          />
        </EditableLayout>
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

AdminAddGroup.defaultProps = {
  panel: 'groupPanel'
};

export default withStyles(styles)(AdminAddGroup);
