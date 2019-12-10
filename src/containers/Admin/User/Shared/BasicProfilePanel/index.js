import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  EditableLayout,
  EditableInput,
  EditableImage,
  EditableTextarea,
  EditableSelect,
  EditableAutocomplete
} from '../../../../../components';
import { getUserRole } from '../../../../../utils/utility';
import { userRoles } from '../../../../../constants/roles';

const styles = theme => {
  return {
    root: {}
  };
};

const BasicProfilePanel = ({ classes, locations, user, editPanel, onEdit, onChange, panel }) => {
  const isEdit = useMemo(() => panel === editPanel
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [editPanel]);

  return (
    <EditableLayout
      panel={panel}
      isEdit={isEdit}
      onEdit={onEdit}>
      <EditableInput
        isEdit={isEdit}
        label='First name'
        value={user.firstName}
        onChange={onChange('firstName')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Last name'
        value={user.lastName}
        onChange={onChange('lastName')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Email'
        value={user.email}
        onChange={onChange('email')}
      />
      <EditableSelect
        isEdit={isEdit}
        label='User Role'
        options={userRoles}
        value={isEdit ? user.role : getUserRole(user.role)}
        onChange={onChange('role')}
      />
      <EditableImage
        isEdit={isEdit}
        label='Photo'
        value={user.avatar}
        firstName={user.firstName}
        lastName={user.lastName}
        onChange={onChange('avatar')}
      />
      <EditableAutocomplete
        isEdit={isEdit}
        label='Location'
        options={locations}
        value={user.location || ''}
        onChange={onChange('location')}
      />
      <EditableTextarea
        isEdit={isEdit}
        label='Short description'
        value={user.shortDescription}
        onChange={onChange('shortDescription')}
      />
      <EditableTextarea
        isEdit={isEdit}
        label='Our view of why great'
        value={user.whySpecial}
        onChange={onChange('whySpecial')}
      />
      <EditableInput
        isEdit={isEdit}
        label='LinkedIn'
        value={user.linkedInURL}
        onChange={onChange('linkedInURL')}
      />
      <EditableInput
        isEdit={isEdit}
        label='Personal website'
        value={user.personalWebsite}
        onChange={onChange('personalWebsite')}
      />
    </EditableLayout>
  );
};

BasicProfilePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

BasicProfilePanel.defaultProps = {
  panel: 'basicProfilePanel'
};

export default withStyles(styles)(BasicProfilePanel);
