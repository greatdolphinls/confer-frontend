
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';
import VerifyIcon from '@material-ui/icons/Link';
import UnVerifyIcon from '@material-ui/icons/LinkOff';

import { AdminTabs } from '../../Shared';
import { setRecommends, removeRecommend, addEditRecommend } from '../../../../actions';
import * as RECOMMEND_SERVICE from '../../../../services/recommend';
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
import timeFormats from '../../../../constants/timeFormats';
import { showErrorToast, getMomentTime } from '../../../../utils/utility';

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

const AdminRecommendList = ({ classes, tab, history }) => {
  const recommends = useSelector(state => state.recommend.data, []);
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [recommendId, setRecommendId] = useState();

  useEffect(() => {
    dispatch(setRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTableData = recommends => {
    const tableData = recommends.map(recommend => {
      const { referrer, candidate, verified, _id, createdAt } = recommend;
      const row = [
        `${referrer.firstName} ${referrer.lastName}`,
        `${candidate.firstName} ${candidate.lastName}`,
        getMomentTime(createdAt, timeFormats.dayTimeFormat),
        verified,
        _id
      ];
      return row;
    });
    return tableData;
  };

  const columns = () => [
    { name: 'Referrer' },
    { name: 'Candidate' },
    { name: 'Created' },
    {
      name: 'Show',
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
          const recommend = recommends.find(recommend => recommend._id === value);

          return (
            <div className={classes.actions}>
              <CustomSwitchButton
                flag={recommend.verified}
                trueIcon={<VerifyIcon />}
                falseIcon={<UnVerifyIcon />}
                onClick={verifyRecommendHandler(value)} />
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
          Add Recommend
        </PrimaryButton>
      );
    }
  };

  const editButtonHandler = (recommendId) => () => {
    history.push(pageLinks.AdminEditRecommend.url.replace(':recommendId', recommendId));
  };

  const addButtonHandler = () => {
    history.push(pageLinks.AdminAddRecommend.url);
  }

  const openConfirmDialogHandler = (opened, removeId) => () => {
    setRecommendId(removeId);
    setShowDialog(opened);
  }

  const closeDialogHandler = () => {
    setRecommendId(null);
    setShowDialog(false);
  }

  const confirmDialogHandler = async () => {
    try {
      const { data } = await RECOMMEND_SERVICE.removeRecommend(recommendId);
      dispatch(removeRecommend(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setRecommendId(null);
    setShowDialog(false);
  }

  const verifyRecommendHandler = (recommendId) => async () => {
    try {
      const response = await RECOMMEND_SERVICE.verifyRecommend(recommendId);
      const { data } = response;
      dispatch(addEditRecommend(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  };

  return (
    <main className={classes.root}>
      <AdminTabs selectedValue='recommends' history={history} />
      <Paper className={classes.paper}>
        <CustomMUIDataTable
          data={createTableData(recommends)}
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

AdminRecommendList.propTypes = {
  classes: PropTypes.object.isRequired
};

AdminRecommendList.defaultProps = {
  tab: 'recommends'
};

export default withStyles(styles)(AdminRecommendList);
