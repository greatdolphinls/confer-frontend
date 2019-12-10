
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { EditIconButton, CloseIconButton, AddIconButton } from '../..';

const styles = theme => {
  return {
    root: {},
    header: {
      width: '100%',
      position: 'relative',
      paddingBottom: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.darkGreyButtonColor}`
    },
    title: {
      fontWeight: 'bold',
      fontFamily: 'Ogg'
    },
    container: {
      position: 'relative',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    addIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0
    },
    editIcon: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  };
};

const EditableLayout = ({ classes, title, panel, isEdit, isAdd, isShowEdit, onEdit, onAdd, children }) => {

  const editHandler = () => {
    onEdit(isEdit ? false : panel);
  }

  const editButtonRender = () => {
    if (isShowEdit) {
      return isEdit
        ? <CloseIconButton
          onClick={editHandler}
          classes={{ root: classes.editIcon }} />
        : <EditIconButton
          onClick={editHandler}
          classes={{ root: classes.editIcon }} />
    }
  }

  return (
    <>
      {
        !!title &&
        <div className={classes.header}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          {
            isAdd &&
            <AddIconButton
              onClick={onAdd}
              classes={{ root: classes.addIcon }} />
          }
        </div>
      }
      <div className={classes.container}>
        {editButtonRender()}
        {children}
      </div>
    </>
  );
};

EditableLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
};

EditableLayout.defaultProps = {
  title: '',
  isAdd: false,
  isEdit: false,
  isShowEdit: true,
  onAdd: () => { },
  onEdit: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableLayout);
