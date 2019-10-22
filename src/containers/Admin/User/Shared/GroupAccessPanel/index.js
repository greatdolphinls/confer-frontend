import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { setGroups } from '../../../../../actions';
import { EditableGroup } from '../';
import { EditableLayout, AddIconButton } from '../../../../../components';
import { addEditArray, removeArray } from '../../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
    },
    label: {
      width: 145,
      fontSize: 14,
      fontWeight: 'bold',
      paddingTop: theme.spacing(1.5)
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
  };
};

const GroupAccessPanel = ({ classes, groups, onChange }) => {
  const groupList = useSelector(state => state.group.data, []);
  const dispatch = useDispatch();

  const [isNew, setIsNew] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    dispatch(setGroups());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const groupIds = groups.map(({ groupId }) => (groupId));
    const data = groupList.filter(({ _id }) => !groupIds.includes(_id))
      .map((group) => ({
        ...group,
        label: group.name,
        value: group._id
      }));

    setGroupOptions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, groupList]);

  const onSaveHandler = (value) => {
    setIsNew(false);
    const data = addEditArray(groups, value);
    onChange(data);
  }

  const onDeleteHandler = (value) => {
    if (!isNew) {
      const data = removeArray(groups, value);
      onChange(data);
    } else {
      setIsNew(false);
    }
  }

  const addHandler = () => {
    if (!isNew) {
      setIsNew(true);
    }
  }

  return (
    <EditableLayout
      isShowEdit={false}
      title={'DISCOVERY ACCESS CONTROLS'}
      panel='groupAccessPanel'>
      <div className={classes.root}>
        <Typography className={classes.label}>
          Groups:
        </Typography>
        <div className={classes.container}>
          {
            !!groups &&
            groups.map((group, index) => {
              let data = groupList.find((item) => (item._id === group.groupId));
              data = { ...data, ...group };

              return (
                <EditableGroup
                  key={index}
                  group={data}
                  groups={groupOptions}
                  onSave={onSaveHandler}
                  onDelete={onDeleteHandler}
                />
              );
            })
          }
          {
            isNew &&
            <EditableGroup
              isNew={true}
              groups={groupOptions}
              onSave={onSaveHandler}
              onDelete={onDeleteHandler}
            />
          }
          {
            !isNew &&
            <AddIconButton
              onClick={addHandler} />
          }
        </div>
      </div>
    </EditableLayout>
  );
};

GroupAccessPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

GroupAccessPanel.defaultProps = {
  groups: []
};

export default withStyles(styles)(GroupAccessPanel);
