
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

import { AdminTabs } from '../../Shared';
import { setGroups, removeGroup } from '../../../../actions';
import * as GROUP_SERVICE from '../../../../services/group';
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
    imageContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      width: 100,
      height: 40,
      objectFit: 'cover',
      borderRadius: 2,
      border: '1px solid grey'
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

const AdminGroupList = ({ classes, history }) => {
  const groups = useSelector(state => state.group.data, []);
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [groupId, setGroupId] = useState();

  useEffect(() => {
    dispatch(setGroups());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTableData = groups => {
    const tableData = groups.map(group => {
      const { name, viewPassword, logo, _id } = group;
      const row = [
        name,
        viewPassword,
        logo,
        _id
      ];
      return row;
    });
    return tableData;
  };

  const columns = () => [
    { name: 'Group Name' },
    { name: 'Group Password' },
    {
      name: 'Logo',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={classes.imageContainer}>
              <img
                className={classes.logo}
                src={value}
                alt='group logo' />
            </div>
          );
        }
      }
    },
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
          Add Group
        </PrimaryButton>
      );
    }
  };

  const editButtonHandler = (groupId) => () => {
    history.push(pageLinks.AdminEditGroup.url.replace(':groupId', groupId));
  };

  const addButtonHandler = () => {
    history.push(pageLinks.AdminAddGroup.url);
  }

  const openConfirmDialogHandler = (opened, removeId) => () => {
    setGroupId(removeId);
    setShowDialog(opened);
  }

  const closeDialogHandler = () => {
    setGroupId(null);
    setShowDialog(false);
  }

  const confirmDialogHandler = async () => {
    try {
      const { data } = await GROUP_SERVICE.removeGroup(groupId);
      dispatch(removeGroup(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setGroupId(null);
    setShowDialog(false);
  }

  return (
    <main className={classes.root}>
      <AdminTabs selectedValue='groups' history={history} />
      <Paper className={classes.paper}>
        <CustomMUIDataTable
          data={createTableData(groups)}
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

AdminGroupList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminGroupList);
