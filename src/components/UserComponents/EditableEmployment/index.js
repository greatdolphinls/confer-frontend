import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Checkbox } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import {
  EditableLayout,
  PrimaryButton,
  CustomSelectValidator,
  ConfirmDialog,
  DateLayout
} from '../..';
import { getDuration, getDiffYearsAndMonths, getYears } from '../../../utils/utility';
import months from '../../../constants/months';

const styles = theme => {
  return {
    root: {},
    showContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    companyName: {
      fontSize: 14,
      fontWeight: 500
    },
    title: {
      fontSize: 12
    },
    duration: {
      fontSize: 12,
      opacity: 0.6
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
    checkboxContainer: {
      display: 'flex',
      fontSize: 14,
      alignItems: 'center'
    },
    checkbox: {
      width: 'fit-content',
      padding: 0,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      color: `${theme.palette.buttonColor} !important`
    },
    dateContainer: {
      display: 'flex',
      marginBottom: theme.spacing(3)
    },
    dateItem: {
      width: 118,
      marginTop: 0,
      marginBottom: 0,
      marginRight: theme.spacing(4)
    },
    saveButton: {
      width: 134
    },
    deleteButton: {
      width: 134,
      marginRight: theme.spacing(3),
      backgroundColor: theme.palette.darkGreyButtonColor
    }
  };
};

const EditableEmployment = ({
  classes, employment, isNew, isEdit, panel, onEdit, onSave, onDelete
}) => {
  const [tempEmployment, setTempEmployment] = useState(employment);
  const [years, setYears] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const data = getYears();
    setYears(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTempEmployment(employment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employment]);

  const onFieldChangeHandler = (name) => async (event) => {
    const data = {
      ...tempEmployment,
      [name]: event.target.value
    }
    setTempEmployment(data);
  }

  const onCheckHandler = (name) => async (event) => {
    const data = {
      ...tempEmployment,
      [name]: event.target.checked
    }
    setTempEmployment(data);
  }

  const deleteHandler = () => {
    if (isNew) {
      setTempEmployment(employment);
    } else {
      onDelete(employment._id);
    }
    setShowDialog(false);
  }

  const saveHandler = () => {
    onSave(tempEmployment);
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
            name='companyName'
            label='Company name'
            className={classes.halfInput}
            value={tempEmployment.companyName}
            placeholder='Google, Inc. '
            onChange={onFieldChangeHandler('companyName')}
            validators={['required']}
            errorMessages={['Company name cannot be empty']} />
          <TextValidator
            name='title'
            label='Title'
            className={classes.halfInput}
            value={tempEmployment.title}
            placeholder='Google, Inc. '
            onChange={onFieldChangeHandler('title')}
            validators={['required']}
            errorMessages={['Title cannot be empty']} />
          <div className={classes.checkboxContainer}>
            <Checkbox
              className={classes.checkbox}
              checked={tempEmployment.currentlyWorks}
              onChange={onCheckHandler('currentlyWorks')}
              value={tempEmployment.currentlyWorks}
            />
            Currently working ...
          </div>
          <div className={classes.dateContainer}>
            <DateLayout
              label='Started'>
              <CustomSelectValidator
                classes={{ root: classes.dateItem }}
                label='Start Month'
                value={tempEmployment.startMonth}
                changed={onFieldChangeHandler('startMonth')}
                items={months} />
              <CustomSelectValidator
                classes={{ root: classes.dateItem }}
                label='Start Year'
                value={tempEmployment.startYear}
                changed={onFieldChangeHandler('startYear')}
                items={years} />
            </DateLayout>
            {
              !tempEmployment.currentlyWorks &&
              <DateLayout
                label='Ended'>
                <CustomSelectValidator
                  classes={{ root: classes.dateItem }}
                  label='End Month'
                  value={tempEmployment.endMonth}
                  changed={onFieldChangeHandler('endMonth')}
                  items={months} />
                <CustomSelectValidator
                  classes={{ root: classes.dateItem }}
                  label='End Year'
                  value={tempEmployment.endYear}
                  changed={onFieldChangeHandler('endYear')}
                  items={years} />
              </DateLayout>
            }
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
    const { startMonth, startYear, endMonth, endYear, currentlyWorks } = employment;
    const duration = getDuration(startYear, startMonth, endYear, endMonth, currentlyWorks)
    const diffYearAndMonth = getDiffYearsAndMonths(startYear, startMonth, endYear, endMonth, currentlyWorks);

    if (!isEdit) {
      return (
        <div className={classes.showContainer}>
          <Typography
            className={classes.companyName}>
            {employment.companyName}
          </Typography>
          <Typography
            className={classes.title}>
            {employment.title}
          </Typography>
          <Typography
            className={classes.duration}>
            {`${diffYearAndMonth} , ${duration}`}
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

EditableEmployment.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableEmployment.defaultProps = {
  isNew: false,
  employment: {
    companyName: '',
    title: '',
    currentlyWorks: false,
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: ''
  },
  onEdit: () => { }
};

export default withStyles(styles)(EditableEmployment);
