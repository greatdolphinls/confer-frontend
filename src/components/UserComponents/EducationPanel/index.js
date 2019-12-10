import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { setDegrees } from '../../../actions';
import { EditableLayout, EditableEducation } from '../..';
import { addEditArray, removeArray } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {}
  };
};

const EducationPanel = ({ classes, educationHistories, onChange }) => {
  const degreeOptions = useSelector(state => state.degree.options, []);
  const dispatch = useDispatch();

  const [editPanel, setEditPanel] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    dispatch(setDegrees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveHandler = (value) => {
    setIsNew(false);
    setEditPanel(false);
    const data = addEditArray(educationHistories, value);
    onChange(data);
  }

  const onDeleteHandler = (value) => {
    setEditPanel(false);
    const data = removeArray(educationHistories, value);
    onChange(data);
  }

  const addHandler = () => {
    if (!isNew) {
      setEditPanel('newEducationPanel');
      setIsNew(true);
    }
  }

  const editHandler = (panel) => {
    setEditPanel(panel);
    setIsNew(false);
  }

  return (
    <EditableLayout
      isShowEdit={false}
      title={'EDUCATION'}
      panel='educationPanel'
      isAdd={true}
      onAdd={addHandler}>
      {
        isNew &&
        <EditableEducation
          isNew={true}
          isEdit={true}
          onEdit={editHandler}
          panel={'newEducationPanel'}
          degrees={degreeOptions}
          onSave={onSaveHandler}
          onDelete={onDeleteHandler}
        />
      }
      {
        !!educationHistories &&
        educationHistories.map((education, index) => {
          const panel = 'educationPanel' + index;
          return (
            <EditableEducation
              key={index}
              isEdit={editPanel === panel}
              onEdit={editHandler}
              panel={panel}
              education={education}
              degrees={degreeOptions}
              onSave={onSaveHandler}
              onDelete={onDeleteHandler}
            />
          );
        })
      }
    </EditableLayout>
  );
};

EducationPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EducationPanel);
