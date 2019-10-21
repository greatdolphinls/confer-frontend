import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { EditableLayout } from '../../../../../components';
import { EditableEmployment } from '../';
import { addEditArray, removeArray } from '../../../../../utils/utility';

const styles = theme => {
  return {
    root: {}
  };
};

const ExperiencePanel = ({ classes, employmentHistories, onChange }) => {
  const [editPanel, setEditPanel] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const onSaveHandler = (value) => {
    setIsNew(false);
    setEditPanel(false);
    const data = addEditArray(employmentHistories, value);
    onChange(data);
  }

  const onDeleteHandler = (value) => {
    setEditPanel(false);
    const data = removeArray(employmentHistories, value);
    onChange(data);
  }

  const addHandler = () => {
    if (!isNew) {
      setEditPanel('newEmploymentPanel');
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
      title={'EXPERIENCE'}
      panel='experiencePanel'
      isAdd={true}
      onAdd={addHandler}>
      {
        isNew && 
        <EditableEmployment 
          isNew={true}
          isEdit={true}
          onEdit={editHandler}
          panel={'newEmploymentPanel'}
          onSave={onSaveHandler}
          onDelete={onDeleteHandler}
        />
      }
      {
        !!employmentHistories && 
        employmentHistories.map((employment, index) => {
          const panel = 'employmentPanel' + index;
          return (
            <EditableEmployment 
              key={index}
              isEdit={editPanel === panel}
              onEdit={editHandler}
              panel={panel}
              employment={employment}
              onSave={onSaveHandler}
              onDelete={onDeleteHandler}
            />
          );
        })
      }
    </EditableLayout>
  );
};

ExperiencePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExperiencePanel);
