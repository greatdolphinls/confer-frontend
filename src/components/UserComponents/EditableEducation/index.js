import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import {
  EditableLayout,
  PrimaryButton,
  CustomSelectValidator,
  ConfirmDialog
} from '../..';
import { getYears } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {},
    showContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    school: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    description: {
      fontSize: 12
    },
    editContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2.5),
      backgroundColor: theme.palette.greyBackColor
    },
    halfInput: {
      width: '50%',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    dateContainer: {
      display: 'flex',
      marginBottom: theme.spacing(3)
    },
    dateItem: {
      width: 150,
      marginTop: 0,
      marginBottom: 0,
      marginRight: theme.spacing(4)
    },
    saveButton: {
      width: 95
    },
    deleteButton: {
      width: 95,
      marginRight: theme.spacing(3),
      backgroundColor: theme.palette.darkGreyButtonColor
    }
  };
};

const EditableEducation = ({
  classes, education, degrees, isNew, isEdit, panel, onEdit, onSave, onDelete
}) => {
  const [tempEducation, setTempEducation] = useState(education);
  const [showDialog, setShowDialog] = useState(false);

  const years = useMemo(() => getYears()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  useEffect(() => {
    setTempEducation(education);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [education]);

  const onFieldChangeHandler = (name) => async (event) => {
    const data = {
      ...tempEducation,
      [name]: event.target.value
    }
    setTempEducation(data);
  }

  const deleteHandler = () => {
    if (isNew) {
      setTempEducation(education);
    } else {
      onDelete(education._id);
    }
    setShowDialog(false);
  }

  const saveHandler = () => {
    onSave(tempEducation);
  }

  const openConfirmDialogHandler = () => {
    setShowDialog(true);
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
  }

  const editContainerRender = () => {
    if (isEdit) {
      return (
        <ValidatorForm
          className={classes.editContainer}
          onSubmit={saveHandler}>
          <TextValidator
            name='school'
            label='School'
            className={classes.halfInput}
            value={tempEducation.school}
            placeholder='University of Michigan'
            onChange={onFieldChangeHandler('school')}
            validators={['required']}
            errorMessages={['School name cannot be empty']} />
          <CustomSelectValidator
            classes={{ root: classes.halfInput }}
            name='degree'
            label='Your degree'
            value={tempEducation.degree}
            placeholder='B.A.'
            changed={onFieldChangeHandler('degree')}
            items={degrees} />
          <TextValidator
            name='majorOrFocus'
            label='Field of study'
            className={classes.halfInput}
            value={tempEducation.majorOrFocus}
            placeholder='Economics, Statistics'
            onChange={onFieldChangeHandler('majorOrFocus')}
            validators={['required']}
            errorMessages={['Field of study cannot be empty']} />
          <div className={classes.dateContainer}>
            <CustomSelectValidator
              classes={{ root: classes.dateItem }}
              label='Graduating Year'
              value={tempEducation.graduatingYear}
              changed={onFieldChangeHandler('graduatingYear')}
              items={years} />
          </div>
          <div>
            <PrimaryButton
              classes={{ root: classes.deleteButton }}
              onClick={openConfirmDialogHandler}>
              Delete
            </PrimaryButton>
            <PrimaryButton
              classes={{ root: classes.saveButton }}
              type='submit'>
              Save
            </PrimaryButton>
          </div>
        </ValidatorForm>
      );
    }
  }

  const showContainerRender = () => {
    const { school, majorOrFocus, degree, graduatingYear } = education;
    let description = degree;

    if (!!majorOrFocus) {
      description += ` in ${majorOrFocus}`;
    }

    if (!!graduatingYear) {
      description += ` , ${graduatingYear}`;
    }

    if (!isEdit) {
      return (
        <div className={classes.showContainer}>
          <Typography
            className={classes.school}>
            {school}
          </Typography>
          <Typography
            className={classes.description}>
            {description}
          </Typography>
        </div>
      );
    }
  }

  return (
    <EditableLayout
      panel={panel}
      isEdit={isEdit}
      onEdit={onEdit}>
      {showContainerRender()}
      {editContainerRender()}
      {
        showDialog &&
        <ConfirmDialog
          opened={showDialog}
          onClose={closeDialogHandler}
          onConfirm={deleteHandler} />
      }
    </EditableLayout>
  );
};

EditableEducation.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableEducation.defaultProps = {
  isNew: false,
  education: {
    school: '',
    majorOrFocus: '',
    degree: '',
    graduatingYear: ''
  },
  onEdit: () => { }
};

export default withStyles(styles)(EditableEducation);
