
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

import { AdminTabs } from '../../Shared';
import { setUsers, removeUser } from '../../../../actions';
import * as USER_SERVICE from '../../../../services/user';
import {
  CustomMUIDataTable,
  EditIconButton,
  RemoveIconButton,
  PrimaryButton,
  ConfirmDialog
} from '../../../../components';
import { commonMUITableOptions } from '../../../../utils/styles';
import { pageLinks } from '../../../../constants/links';
import { showErrorToast } from '../../../../utils/utility';

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
    }
  };
};

const AdminUserList = ({ classes, history }) => {
  const users = useSelector(state => state.user.data, []);
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    dispatch(setUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTableData = users => {
    const tableData = users.map(user => {
      const { firstName, lastName, email, _id } = user;
      const row = [
        firstName,
        lastName,
        email,
        _id
      ];
      return row;
    });
    return tableData;
  };

  const columns = () => [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email' },
    {
      name: 'Action',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={classes.actions}>
              <EditIconButton
                onClick={editButtonHandler(value)} />
              <RemoveIconButton
                onClick={openConfirmDialogHandler(true, value)} />
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
          onClick={addButtonHandler}>
          Add User
        </PrimaryButton>
      );
    }
  };

  const editButtonHandler = (userId) => () => {
    history.push(pageLinks.AdminEditUser.url.replace(':userId', userId));
  };

  const addButtonHandler = () => {
    history.push(pageLinks.AdminAddUser.url);
  }

  const openConfirmDialogHandler = (opened, removeId) => () => {
    setUserId(removeId);
    setShowDialog(opened);
  }

  const closeDialogHandler = () => {
    setUserId(null);
    setShowDialog(false);
  }

  const confirmDialogHandler = async () => {
    try {
      const { data } = await USER_SERVICE.removeUser(userId);
      dispatch(removeUser(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setUserId(null);
    setShowDialog(false);
  }

  return (
    <main className={classes.root}>
      <AdminTabs selectedValue='users' history={history} />
      <Paper className={classes.paper}>
        <CustomMUIDataTable
          data={createTableData(users)}
          columns={columns()}
          options={options} />
      </Paper>
      <ConfirmDialog
        opened={showDialog}
        onClose={closeDialogHandler}
        onConfirm={confirmDialogHandler} />
    </main>
  );
};

AdminUserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminUserList);
