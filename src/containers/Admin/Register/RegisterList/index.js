
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

import { AdminTabs } from '../../Shared';
import { SendRequestModal, AddRequestModal } from '../Shared';
import { setRegisters, removeRegister, setGroups } from '../../../../actions';
import * as REGISTER_SERVICE from '../../../../services/register';
import {
  CustomMUIDataTable,
  SendIconButton,
  RemoveIconButton,
  PrimaryButton,
  ConfirmDialog
} from '../../../../components';
import notifications from '../../../../constants/notifications';
import { commonMUITableOptions } from '../../../../utils/styles';
import { showInfoToast, showErrorToast, getMomentTime } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(4)}px 0`
    },
    paper: {
      margin: `${theme.spacing(2)}px 0`
    },
    actions: {
      display: 'flex'
    },
    addButton: {
      color: theme.palette.subButtonColor,
      backgroundColor: theme.palette.subBackColor4,
      boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)`,
    }
  };
};

const AdminRegisterList = ({ classes, tab, history }) => {
  const groups = useSelector(state => state.group.data, []);
  const registers = useSelector(state => state.register.data, []);
  const dispatch = useDispatch();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [sendDialog, setSendDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [registerId, setRegisterId] = useState();
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    dispatch(setGroups());
    dispatch(setRegisters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const groupsData = groups.map(({ name, _id }) => ({ label: name, value: _id }));
    setGroupOptions(groupsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  const createTableData = registers => {
    const tableData = registers.map(register => {
      const { email, _id, createdAt } = register;
      const row = [
        email,
        getMomentTime(createdAt),
        _id
      ];
      return row;
    });
    return tableData;
  };

  const columns = () => [
    { name: 'Email' },
    { name: 'Date' },
    {
      name: 'Action',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={classes.actions}>
              <SendIconButton
                onClick={modalHandler('send', true, value)} />
              <RemoveIconButton
                onClick={modalHandler('delete', true, value)} />
            </div>
          );
        }
      }
    }
  ];

  const options = {
    ...commonMUITableOptions,
    customToolbar: () => {
      return (
        <PrimaryButton
          className={classes.addButton}
          onClick={modalHandler('add', true)}>
          Add New Request
        </PrimaryButton>
      );
    }
  };

  const modalHandler = (modal, show, registerId = null) => () => {
    setRegisterId(registerId);
    switch (modal) {
      case 'send':
        setSendDialog(show);
        break;
      case 'add':
        setAddDialog(show);
        break;
      case 'delete':
        setDeleteDialog(show);
        break;
      default:
        break
    }
  }

  const deleteConfirmHandler = async () => {
    try {
      const { data } = await REGISTER_SERVICE.removeRegister(registerId);
      dispatch(removeRegister(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setRegisterId(null);
    setDeleteDialog(false);
  }

  const sendConfirmHandler = async (groupId) => {
    try {
      const register = { registerId, groupId };
      const { data } = await REGISTER_SERVICE.sendRegisterRequest(register);
      dispatch(removeRegister(data));
      showInfoToast(notifications.SUCCESS_SEND_REGISTER_REQUEST)
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setRegisterId(null);
    setSendDialog(false);
  };

  const addConfirmHandler = async (register) => {
    try {
      await REGISTER_SERVICE.addRegisterRequest(register);
      showInfoToast(notifications.SUCCESS_SEND_REGISTER_REQUEST)
      setAddDialog(false)
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  return (
    <main className={classes.root}>
      <AdminTabs selectedValue={tab} history={history} />
      <Paper className={classes.paper}>
        <CustomMUIDataTable
          data={createTableData(registers)}
          columns={columns()}
          options={options} />
      </Paper>
      {
        deleteDialog &&
        <ConfirmDialog
          opened={deleteDialog}
          onClose={modalHandler('delete', false)}
          onConfirm={deleteConfirmHandler} />
      }
      {
        sendDialog &&
        <SendRequestModal
          groups={groupOptions}
          opened={sendDialog}
          onClose={modalHandler('send', false)}
          onConfirm={sendConfirmHandler} />
      }
      {
        addDialog &&
        <AddRequestModal
          groups={groupOptions}
          opened={addDialog}
          onClose={modalHandler('add', false)}
          onConfirm={addConfirmHandler} />
      }
    </main>
  );
};

AdminRegisterList.propTypes = {
  classes: PropTypes.object.isRequired
};

AdminRegisterList.defaultProps = {
  tab: 'registers'
};

export default withStyles(styles)(AdminRegisterList);
