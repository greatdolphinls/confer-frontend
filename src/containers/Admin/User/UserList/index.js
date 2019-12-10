
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import VerifyIcon from '@material-ui/icons/Link';
import UnVerifyIcon from '@material-ui/icons/LinkOff';

import { AdminTabs } from '../../Shared';
import { setUsers, removeUser, addEditUser, setLoadingStatus } from '../../../../actions';
import * as USER_SERVICE from '../../../../services/user';
import {
  CustomMUIDataTable,
  EditIconButton,
  RemoveIconButton,
  PrimaryButton,
  ConfirmDialog,
  CustomChip,
  CustomSwitchButton
} from '../../../../components';
import { commonMUITableOptions } from '../../../../utils/styles';
import { pageLinks } from '../../../../constants/links';
import { showErrorToast, getMomentTime } from '../../../../utils/utility';
import { ImportUserModal } from '../Shared';

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
    table: {
      '& th': {
        padding: `0 ${theme.spacing(0.5)}px`,
      },
      '& td': {
        padding: `0 ${theme.spacing(0.5)}px`,
        fontSize: 12
      }
    },
    actions: {
      display: 'flex'
    },
    addButton: {
      marginLeft: theme.spacing(1),
      color: theme.palette.subButtonColor,
      backgroundColor: theme.palette.subBackColor4,
      boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)`,
    },
  };
};

const AdminUserList = ({ classes, tab, history }) => {
  const users = useSelector(state => state.user.data, []);
  const dispatch = useDispatch();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [importDialog, setImportDialog] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    dispatch(setUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTableData = users => {
    const tableData = users.map(user => {
      const { firstName, lastName, email, createdAt, verified, _id, recommends, linkedInURL } = user;
      let approveRecommend = 0, unAprroveRecommend = 0;
      recommends.map((recommend) => (
        recommend.verified ? approveRecommend++ : unAprroveRecommend++
      ));

      const row = [
        firstName,
        lastName,
        email,
        linkedInURL,
        `${approveRecommend} / ${unAprroveRecommend}`,
        getMomentTime(createdAt),
        verified,
        _id
      ];
      return row;
    });
    return tableData;
  };

  const columns = useMemo(() => [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email' },
    { name: 'LinkedIn URL' },
    { name: '#' },
    { name: 'Created' },
    {
      name: 'Access',
      options: {
        customBodyRender: value => {
          const labels = ['Verified', 'Unverified'];
          return (
            <CustomChip flag={value} labels={labels} />
          );
        }
      }
    },
    {
      name: 'Action',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const user = users.find(user => user._id === value);

          return (
            <div className={classes.actions}>
              <CustomSwitchButton
                flag={user.verified}
                trueIcon={<VerifyIcon />}
                falseIcon={<UnVerifyIcon />}
                onClick={verifyUserHandler(value)} />
              <EditIconButton
                onClick={editButtonHandler(value)} />
              <RemoveIconButton
                onClick={modalHandler('delete', true, value)} />
            </div>
          );
        }
      }
    }
  ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [users]);

  const options = useMemo(() =>
    ({
      ...commonMUITableOptions,
      customToolbar: () => {
        return (
          <>
            <PrimaryButton
              className={classes.addButton}
              onClick={addButtonHandler}>
              Add User
          </PrimaryButton>
            <PrimaryButton
              className={classes.addButton}
              onClick={modalHandler('import', true)}>
              Import CSV
          </PrimaryButton>
          </>
        );
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);

  const modalHandler = (modal, show, userId = null) => () => {
    setUserId(userId);
    switch (modal) {
      case 'import':
        setImportDialog(show);
        break;
      case 'delete':
        setDeleteDialog(show);
        break;
      default:
        break
    }
  }

  const editButtonHandler = (userId) => () => {
    history.push(pageLinks.AdminEditUser.url.replace(':userId', userId));
  };

  const addButtonHandler = () => {
    history.push(pageLinks.AdminAddUser.url);
  }

  const deleteConfirmHandler = async () => {
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
    setDeleteDialog(false);
  }

  const importConfirmHandler = async (file) => {
    dispatch(setLoadingStatus({
      loading: true,
      text: 'Importing CSV...'
    }));
    try {
      const { data } = await USER_SERVICE.importUserCSV(file);
      data.map((item) => (dispatch(addEditUser(item))));
      setImportDialog(false);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    dispatch(setLoadingStatus({ loading: false }));
  }

  const verifyUserHandler = (userId) => async () => {
    try {
      const response = await USER_SERVICE.verifyUser(userId);
      const { data } = response;
      dispatch(addEditUser(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  };

  return (
    <main className={classes.root}>
      <AdminTabs selectedValue={tab} history={history} />
      <Paper className={classes.paper}>
        <CustomMUIDataTable
          classes={{ root: classes.table }}
          data={createTableData(users)}
          columns={columns}
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
        importDialog &&
        <ImportUserModal
          opened={importDialog}
          onClose={modalHandler('import', false)}
          onConfirm={importConfirmHandler} />
      }
    </main>
  );
};

AdminUserList.propTypes = {
  classes: PropTypes.object.isRequired
};

AdminUserList.defaultProps = {
  tab: 'users'
};

export default withStyles(styles)(AdminUserList);
