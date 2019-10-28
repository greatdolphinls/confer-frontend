import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import {
  EditableLayout,
  EditableImage,
  EditableInput,
  EditableTextarea,
  EditableSelect,
  Avatar
} from '../..';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';
import PersonalWebsiteImage from '../../../assets/img/icons/personal-website.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      margin: `${theme.spacing(3)}px 0`
    },
    avatar: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5)
    },
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(3)
    },
    name: {
      fontSize: 24,
      marginBottom: theme.spacing(0.5)
    },
    location: {
      fontSize: 12,
      marginBottom: theme.spacing(0.5)
    },
    about: {
      fontSize: 12,
      opacity: 0.6,
      marginBottom: theme.spacing(0.5)
    },
    linkedInURL: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      marginBottom: theme.spacing(0.5),
      '& img': {
        marginRight: theme.spacing(1)
      }
    },
    personalWebsite: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      opacity: 0.6,
      '& img': {
        marginRight: theme.spacing(1)
      }
    }
  };
};

const BasicPanel = ({
  classes, panel, locations, user, editPanel, onEdit, onChange
}) => {
  const isEdit = panel === editPanel;

  const showContainerRender = () => {
    if (!isEdit) {
      return (
        <div className={classes.root}>
          <Avatar
            classes={{ root: classes.avatar }}
            size={116}
            src={user.avatar} />
          <div className={classes.container}>
            <Typography className={classes.name}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography className={classes.location}>
              {user.location}
            </Typography>
            <Typography className={classes.about}>
              {user.about || 'About you... [this will appear next to your recommendation of someone]'}
            </Typography>
            <Typography className={classes.linkedInURL}>
              <img src={LinkedInImage} alt='linkedIn' />
              {user.linkedInURL || 'LinkedIn URL'}
            </Typography>
            <Typography className={classes.personalWebsite}>
              <img src={PersonalWebsiteImage} alt='personalWebsite' />
              {user.personalWebsite || 'Personal Website'}
            </Typography>
          </div>
        </div>
      )
    }
  }

  const editContainerRender = () => {
    if (isEdit) {
      return (
        <div className={classes.root}>
          <EditableImage
            isEdit={isEdit}
            isAvatar={true}
            value={user.avatar}
            onChange={onChange('avatar')}
          />
          <div className={classes.container}>
            <Typography className={classes.name}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <EditableSelect
              isEdit={isEdit}
              options={locations}
              value={user.location}
              onChange={onChange('location')}
            />
            <EditableTextarea
              isEdit={isEdit}
              value={user.about}
              onChange={onChange('about')}
            />
            <div className={classes.linkedInURL}>
              <img src={LinkedInImage} alt='linkedIn' />
              <EditableInput
                isEdit={isEdit}
                value={user.linkedInURL}
                onChange={onChange('linkedInURL')}
              />
            </div>
            <div className={classes.personalWebsite}>
              <img src={PersonalWebsiteImage} alt='personalWebsite' />
              <EditableInput
                isEdit={isEdit}
                value={user.personalWebsite}
                onChange={onChange('personalWebsite')}
              />
            </div>
          </div>
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
    </EditableLayout>
  )
};

BasicPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

BasicPanel.defaultProps = {
  panel: 'basicPanel'
};

export default withStyles(styles)(BasicPanel);
