import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  EditableLayout,
  EditableInput,
  EditableSelect,
  EditableMultiSelect
} from '../../../../../components';

const styles = theme => {
  return {
    root: {}
  };
};

const PreferencePanel = ({
  classes, locations, expertises, subExpertises, user, editPanel, onEdit, onChange
}) => {
  const isEdit = 'preferencePanel' === editPanel;

  return (
    <EditableLayout
      title={'PREFERENCES'}
      panel='preferencePanel'
      isEdit={isEdit}
      onEdit={onEdit}>
      <EditableInput
        isEdit={isEdit}
        label='Search status'
        placeholder='Select what you’re interested in'
        value={user.searchStatus}
        onChange={onChange('searchStatus')}
      />
      <EditableSelect
        isEdit={isEdit}
        label='Primary expertise area'
        placeholder='Select your primary expertise area'
        options={expertises}
        value={user.primaryExpertises}
        onChange={onChange('primaryExpertise')}
      />
      <EditableMultiSelect
        isEdit={isEdit}
        label='Sub-expertise areas'
        placeholder='Tell us where you really shine'
        options={subExpertises}
        value={user.subExpertises}
        onChange={onChange('subExpertises')}
      />
      <EditableSelect
        isEdit={isEdit}
        label='Desired location'
        placeholder='Select your top locations'
        options={locations}
        value={user.preferenceLocationPref}
        onChange={onChange('preferenceLocationPref')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Your ideal next job'
        placeholder='Tell us where you want to take your career next (company size and type, job function and role, etc.)'
        value={user.preferenceRole}
        onChange={onChange('preferenceRole')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Ideal company size'
        placeholder='Tell us about your ideal company size'
        value={user.preferenceCompanySize}
        onChange={onChange('preferenceCompanySize')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Ideal industry'
        placeholder='Tell us about which industry intrests you most'
        value={user.preferenceIndustry}
        onChange={onChange('preferenceIndustry')}
      />
    </EditableLayout>
  )
};

PreferencePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PreferencePanel);
