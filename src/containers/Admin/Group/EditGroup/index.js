
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as GROUP_SERVICE from '../../../../services/group';
import { setGroups, removeGroup } from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import { AccordionLayout, ConfirmDialog } from '../../../../components';
import { showErrorToast } from '../../../../utils/utility';

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

  const expandHandler = panel => {
    setExpanded(panel);
  };

  const editHandler = (panel) => {
    setEditPanel(panel);
  }

  const backHandler = () => {
    history.push(pageLinks.AdminGroupList.url);
  }

  const saveHandler = () => {
    history.push(pageLinks.AdminGroupList.url);
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
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam. Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
          </Typography>
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

AdminEditGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminEditGroup);
