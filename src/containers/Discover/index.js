
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { setExpertises, setLocations, setDiscoverRecommends } from '../../actions';
import { CustomSelect, PrimaryButton } from '../../components';
import { CandidateProfile, ContactEmailModal, ExceptProfile } from './Shared';
import { useInput } from '../../utils/hooks';
import years from '../../constants/years';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(3.5)
    },
    description: {
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
      width: 101
    }
  };
};


const Discover = ({ classes }) => {
  const expertises = useSelector(state => state.expertise.data, []);
  const locations = useSelector(state => state.location.data, []);
  const recommends = useSelector(state => state.recommend.discover, []);
  const dispatch = useDispatch();

  const expertise = useInput('default');
  const experiencedYear = useInput(years[0].value);
  const location = useInput('default');
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setLocations());
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
  expertiseOptions = [{ label: 'all experises', value: 'default' }, ...expertiseOptions];
  let locationOptions = locations.map(({ name }) => ({ label: name, value: name }));
  locationOptions = [{ label: 'all locations', value: 'default' }, ...locationOptions];

  const stepButtonHandler = (stepCount) => () => {
    setStep(stepCount);
  }

  const submitHandler = () => {
    setShowModal(true);
  }

  const comfirmModalHandler = () => {
    setShowModal(false);
  }

  const closeModalHandler = () => {
    setShowModal(false);
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

  return (
    <main className={classes.root}>
      <Typography className={classes.description}>
        Tell us about the role you are looking to fill:
      </Typography>
      {renderFilter()}
      {recommends.length === 0 || step === recommends.length
        ? <ExceptProfile onInit={onInit} />
        : <CandidateProfile
          recommend={recommends[step]} />
      }
      {
        step < recommends.length &&
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
      }
      {showModal &&
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
