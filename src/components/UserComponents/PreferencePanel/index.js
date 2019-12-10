import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import companySizes from '../../../constants/companySizes';

import {
  EditableLayout,
  EditableInput,
  EditableSelect,
  EditableMultiSelect,
  EditableLimitMultiSelect,
  EditableLimitAutocomplete
} from '../..';

const styles = theme => {
  return {
    root: {}
  };
};

const PreferencePanel = ({
  classes, panel, searches, positions, locations, industries, user, editPanel, onEdit, onChange
}) => {
  const isEdit = useMemo(() => panel === editPanel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [editPanel]);

  return (
    <EditableLayout
      title={'PREFERENCES'}
      panel={panel}
      isEdit={isEdit}
      onEdit={onEdit}>
      <EditableSelect
        isEdit={isEdit}
        label='Currently looking for'
        placeholder='Select what you’re interested in'
        options={searches}
        value={user.searchStatus}
        onChange={onChange('searchStatus')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Your ideal next role'
        placeholder='Describe your ideal next role so we can find the best matches'
        value={user.preferenceRole}
        onChange={onChange('preferenceRole')}
      />
      <EditableMultiSelect
        isEdit={isEdit}
        label='Desired company size'
        placeholder='Tell us about your ideal company size'
        options={companySizes}
        value={user.preferenceCompanySize}
        onChange={onChange('preferenceCompanySize')}
      />
      <EditableLimitMultiSelect
        limit={3}
        isEdit={isEdit}
        label='Desired industry'
        placeholder='Tell us about which industry intrests you most'
        options={industries}
        value={user.preferenceIndustry}
        onChange={onChange('preferenceIndustry')}
      />
      <EditableLimitAutocomplete
        limit={3}
        isEdit={isEdit}
        label='Desired location'
        placeholder='Select your top locations'
        options={locations}
        value={user.preferenceLocationPref}
        onChange={onChange('preferenceLocationPref')}
      />
      <EditableMultiSelect
        isEdit={isEdit}
        label='Other opportunities'
        placeholder='Select other opportunities you have an interest in'
        options={positions}
        value={user.interestedPosition}
        onChange={onChange('interestedPosition')}
      />
    </EditableLayout>
  )
};

PreferencePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

PreferencePanel.defaultProps = {
  panel: 'preferencePanel'
};

export default withStyles(styles)(PreferencePanel);
