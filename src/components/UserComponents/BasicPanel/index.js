import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {
  EditableLayout,
  EditableImage,
  EditableInput,
  EditableTextarea,
  EditableAutocomplete,
  Avatar
} from '../..';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';
import PersonalWebsiteImage from '../../../assets/img/icons/personal-website.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      margin: `${theme.spacing(3)}px 0`,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    avatar: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5)
    },
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0
      }
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Ogg'
    },
    location: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: theme.spacing(1)
    },
    shortDescription: {
      fontSize: 12,
      opacity: 0.6,
      marginBottom: theme.spacing(1)
    },
    linkedInURL: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      marginBottom: theme.spacing(1)
    },
    personalWebsite: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      opacity: 0.6
    },
    imgEditContainer: {
      display: 'flex',
      alignItems: 'baseline',
    },
    img: {
      width: 15,
      marginRight: theme.spacing(1)
    }
  };
};

const BasicPanel = ({
  classes, panel, locations, user, editPanel, onEdit, onChange
}) => {
  const isEdit = useMemo(() => panel === editPanel
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [editPanel]);

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
              {user.location || 'Location'}
            </Typography>
            <Typography className={classes.shortDescription}>
              {user.shortDescription || 'About you... [this will appear next to your recommendation of someone]'}
            </Typography>
            <Typography className={classes.linkedInURL}>
              <img
                src={LinkedInImage}
                alt='linkedIn'
                className={classes.img} />
              {user.linkedInURL || 'LinkedIn URL'}
            </Typography>
            <Typography className={classes.personalWebsite}>
              <img
                src={PersonalWebsiteImage}
                alt='personalWebsite'
                className={classes.img} />
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
            firstName={user.firstName}
            lastName={user.lastName}
            onChange={onChange('avatar')}
          />
          <div className={classes.container}>
            <Typography className={classes.name}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <EditableAutocomplete
              isEdit={isEdit}
              options={locations}
              value={user.location}
              onChange={onChange('location')}
            />
            <EditableTextarea
              rows={1}
              isEdit={isEdit}
              value={user.shortDescription}
              onChange={onChange('shortDescription')}
            />
            <div className={classes.imgEditContainer}>
              <img
                src={LinkedInImage}
                alt='linkedIn'
                className={classes.img} />
              <EditableInput
                isEdit={isEdit}
                value={user.linkedInURL}
                onChange={onChange('linkedInURL')}
              />
            </div>
            <div className={classes.imgEditContainer}>
              <img
                src={PersonalWebsiteImage}
                alt='personalWebsite'
                className={classes.img} />
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
