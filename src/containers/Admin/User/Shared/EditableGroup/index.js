import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import VerifyIcon from '@material-ui/icons/Link';
import UnVerifyIcon from '@material-ui/icons/LinkOff';
import { ValidatorForm } from 'react-material-ui-form-validator';

import {
  CustomSelectValidator,
  SaveIconButton,
  RemoveIconButton,
  ConfirmDialog,
  CustomSwitchButton
} from '../../../../../components';
import { useInput } from '../../../../../utils/hooks';

const styles = theme => {
  return {
    root: {
      width: '100%'
    },
    container: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    name: {
      fontSize: 14,
      fontWeight: 500
    },
    access: {
      fontSize: 12,
      opacity: 0.6,
      width: 200
    },
    halfInput: {
      width: '50%',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center'
    }
  };
};

const EditableGroup = ({
  classes, group, groups, isNew, onSave, onDelete
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const selectId = useInput('');

  const deleteHandler = () => {
    onDelete(group._id);
    setShowDialog(false);
  }

  const verifyGroupHandler = (access) => () => {
    const data = {
      _id: group._id,
      groupId: group.groupId,
      access: !access
    }
    onSave(data);
  }

  const saveHandler = () => {
    let data = groups.find((group) => (group._id === selectId.value));
    data = {
      groupId: data._id,
      access: false
    }
    onSave(data);
  }

  const openConfirmDialogHandler = () => {
    setShowDialog(true);
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
  }

  const editContainerRender = () => {
    if (isNew) {
      return (
        <ValidatorForm
          className={classes.container}
          onSubmit={saveHandler}>
          <CustomSelectValidator
            classes={{ root: classes.halfInput }}
            value={selectId.value}
            changed={selectId.onChange}
            items={groups}
          />
          <div>
            <SaveIconButton type='submit' />
            <RemoveIconButton onClick={openConfirmDialogHandler} />
          </div>
        </ValidatorForm>
      );
    }
  }

  const showContainerRender = () => {
    const { name, access } = group;

    if (!isNew) {
      return (
        <div className={classes.container}>
          <Typography
            className={classes.name}>
            {name}
          </Typography>
          <div className={classes.buttonContainer}>
            <Typography
              className={classes.access}>
              {access ? 'Access Granted' : 'Access Refused'}
            </Typography>
            <CustomSwitchButton
              flag={access}
              trueIcon={<VerifyIcon />}
              falseIcon={<UnVerifyIcon />}
              onClick={verifyGroupHandler(access)} />
            <RemoveIconButton onClick={openConfirmDialogHandler} />
          </div>
        </div>
      );
    }
  }

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        {showContainerRender()}
        {editContainerRender()}
      </div>
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

EditableGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableGroup.defaultProps = {
  isNew: false,
  group: {
    _id: '',
    groupId: '',
    access: false
  },
  onEdit: () => { }
};

export default withStyles(styles)(EditableGroup);
