import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { BackButton, PrimaryButton } from '../../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    backButton: {
      fontSize: 24
    },
    saveButton: {
      width: 134
    }
  };
};

const EditControlButtons = ({ classes, backLabel, onBack, onSave }) => {

  return (
    <main className={classes.root}>
      <BackButton
        label={backLabel}
        onBack={onBack}
        classes={{ root: classes.backButton }}
      />
      <PrimaryButton
        onClick={onSave}
        classes={{ root: classes.saveButton }}>
        Update
      </PrimaryButton>
    </main>
  );
};

EditControlButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

EditControlButtons.defaultProps = {
  label: 'Back',
  onBack: () => { },
  onSave: () => { }
};

export default withStyles(styles)(EditControlButtons);
