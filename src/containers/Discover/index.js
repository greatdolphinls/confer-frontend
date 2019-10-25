
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import * as MAILER_SERVICE from '../../services/mailer';
import {
  setExpertises,
  setLocations,
  setUserRecommends,
  setDiscoverRecommends
} from '../../actions';
import { CustomSelect, PrimaryButton } from '../../components';
import { CandidateProfile, ContactEmailModal, ExceptProfile } from './Shared';
import { useInput } from '../../utils/hooks';
import years from '../../constants/years';
import { roles } from '../../constants/roles';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(3.5)
    },
    filterDescription: {
      marginBottom: theme.spacing(1.5)
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    select: {
      width: 270,
      [theme.breakpoints.down('sm')]: {
        width: 195
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginBottom: theme.spacing(2)
      }
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: theme.spacing(3)
    },
    contactButton: {
      width: 176,
      [theme.breakpoints.down('xs')]: {
        width: 101
      }
    },
    arrowButton: {
      width: 101,
      backgroundColor: theme.palette.darkGreyButtonColor
    },
    footerDescription: {
      fontSize: 12,
      fontWeight: 500,
      width: 706,
      textAlign: 'center',
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
  };
};


const Discover = ({ classes }) => {
  const expertises = useSelector(state => state.expertise.data, []);
  const locations = useSelector(state => state.location.data, []);
  const recommends = useSelector(state => state.recommend.discover, []);
  const userRecommends = useSelector(state => state.recommend.user, []);
  const { user } = useSelector(state => state.auth, []);
  const dispatch = useDispatch();

  const expertise = useInput('default');
  const experiencedYear = useInput(years[0].value);
  const location = useInput('default');
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setLocations());
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filter = {
      expertiseArea: expertise.value,
      experiencedYear: parseInt(experiencedYear.value),
      location: location.value,
      step: 0
    };

    dispatch(setDiscoverRecommends(true, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertise.value, experiencedYear.value, location.value]);

  useEffect(() => {
    if (step === recommends.length) {
      const filter = {
        expertiseArea: expertise.value,
        experiencedYear: parseInt(experiencedYear.value),
        location: location.value,
        step: step
      };

      dispatch(setDiscoverRecommends(false, filter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const onInit = () => {
    expertise.onChange('default');
    experiencedYear.onChange(years[0].value);
    location.onChange('default');
    setStep(0);
  }

  let expertiseOptions = expertises.map(({ name }) => ({ label: name, value: name }));
  expertiseOptions = [{ label: 'All expertises', value: 'default' }, ...expertiseOptions];
  let locationOptions = locations.map(({ name }) => ({ label: name, value: name }));
  locationOptions = [{ label: 'All locations', value: 'default' }, ...locationOptions];

  const stepButtonHandler = (stepCount) => () => {
    setStep(stepCount);
  }

  const submitHandler = () => {
    setShowModal(true);
  }

  const comfirmModalHandler = () => {
    const data = {
      candidateEmail: recommends[step].candidate.email,
      senderName: `${user.firstName} ${user.lastName}`,
      referrerName: `${recommends[step].referrer.firstName} ${recommends[step].referrer.lastName}`,
      candidateName: `${recommends[step].candidate.firstName} ${recommends[step].candidate.lastName}`
    }
    MAILER_SERVICE.contactCandidate(data);
    setShowModal(false);
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }

  const isNotShowRecommends = () => {
    if (user.role === roles.ADMIN_ROLE) {
      return recommends.length === 0
        || step === recommends.length
        || !user.verified
    }

    return recommends.length === 0
      || step === recommends.length
      || userRecommends.length < 3
      || !user.verified
  }

  const renderFilter = () => {
    return (
      <div className={classes.filterContainer}>
        <CustomSelect
          label='Functional area'
          onChange={expertise.onChange}
          value={expertise.value}
          options={expertiseOptions}
          classes={{ root: classes.select }} />
        <CustomSelect
          label='Years of experience'
          onChange={experiencedYear.onChange}
          value={experiencedYear.value}
          options={years}
          classes={{ root: classes.select }} />
        <CustomSelect
          label='Location'
          onChange={location.onChange}
          value={location.value}
          options={locationOptions}
          classes={{ root: classes.select }} />
      </div>
    );
  }

  const renderFooterText = () => {
    if (!isNotShowRecommends()) {
      const { groupObjects } = user;
      let groupNames = '';

      groupObjects.map((group, index) => {
        groupNames = groupNames + ' ' + group.name;
        if ((index + 1) !== groupObjects.length) {
          groupNames += ', ';
        }
        return null;
      });

      return (
        <>
          <div className={classes.footerDescription}>
            You currently have access to all recommendations made by
            {groupNames} members. In the future, you will have an opportuntiy
            to access recommendations made by other communities. We will
            notify you when that feature becomes available.
          </div>
          <div className={classes.footerDescription}>
            If you know other leading executives who are outstanding at
            identifying talent, please share the group link and password
            with them. We will review their experience and recommendations
            before granting access.
          </div>
        </>
      )
    }
  }

  const renderBottons = () => {
    if (!isNotShowRecommends()) {
      return (
        <div className={classes.buttonContainer}>
          <PrimaryButton
            onClick={stepButtonHandler(step - 1)}
            disabled={step === 0}
            classes={{ root: classes.arrowButton }}>
            Previous
          </PrimaryButton>
          <PrimaryButton
            onClick={submitHandler}
            classes={{ root: classes.contactButton }}>
            contact
          </PrimaryButton>
          <PrimaryButton
            onClick={stepButtonHandler(step + 1)}
            classes={{ root: classes.arrowButton }}>
            Next
          </PrimaryButton>
        </div>
      )
    }
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.filterDescription}>
        Tell us about the role you are looking to fill:
      </Typography>
      {renderFilter()}
      {
        isNotShowRecommends()
          ? <ExceptProfile
            isNotApproved={userRecommends.length < 3 || !user.verified}
            onInit={onInit} />
          : <CandidateProfile
            recommend={recommends[step]} />
      }
      {renderBottons()}
      {renderFooterText()}
      {
        showModal &&
        <ContactEmailModal
          opened={showModal}
          candidateName={recommends[step].candidate.firstName}
          referrerName={`${recommends[step].referrer.firstName} ${recommends[step].referrer.lastName}`}
          onClose={closeModalHandler}
          onConfirm={comfirmModalHandler} />
      }
    </main>
  );
};

export default withStyles(styles, { withTheme: true })(Discover);
