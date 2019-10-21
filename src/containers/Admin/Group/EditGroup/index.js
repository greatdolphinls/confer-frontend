
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as GROUP_SERVICE from '../../../../services/group';
import { setGroups, removeGroup, addEditGroup } from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import notifications from '../../../../constants/notifications';
import {
  AccordionLayout,
  EditableLayout,
  ConfirmDialog,
  EditableInput,
  EditableImage,
  NotFound
} from '../../../../components';
import { showErrorToast } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing(6)
    }
  };
};

const AdminEditGroup = ({ classes, panel, match, history }) => {
  const groups = useSelector(state => state.group.data, []);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(panel);
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
    let data = {
      ...group,
      [name]: !!event.target ? event.target.value : event
    }

    if (name === 'viewPassword') {
      data = {
        ...data,
        password: !!event.target ? event.target.value : event
      }
    }
    setGroup(data);
  }

  const saveHandler = async () => {
    if (!group.name || !group.viewPassword) {
      showErrorToast(notifications.FORM_VALODATION_ERROR);
      return null;
    }

    try {
      const { data } = await GROUP_SERVICE.editGroup(group);
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
    const isEdit = panel === editPanel;

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
  } else {
    return (
      <NotFound />
    );
  }
};

AdminEditGroup.defaultProps = {
  panel: 'groupPanel'
};

export default withStyles(styles)(AdminEditGroup);
