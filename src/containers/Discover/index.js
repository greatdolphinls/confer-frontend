
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import * as CONTACT_SERVICE from '../../services/contact';
import {
  setExpertises,
  setLocations,
  setUserRecommends,
  setDiscoverRecommends
} from '../../actions';
import {
  DiscoverCard,
  CustomSelect,
  CustomAutocomplete,
  PrimaryButton,
  NextIconButton,
  PrevIconButton
} from '../../components';
import {
  ContactEmailModal,
  ExceptProfile
} from './Shared';
import { useInput } from '../../utils/hooks';
import years from '../../constants/years';
import { roles } from '../../constants/roles';
import { isEmpty } from '../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(3.5)
    },
    filterDescription: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: theme.spacing(2)
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      paddingBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    select: {
      width: 240,
      margin: `0 ${theme.spacing(2)}px`,
      [theme.breakpoints.down('sm')]: {
        margin: `0 ${theme.spacing(1)}px`,
        width: 195
      },
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        width: '100%',
        marginBottom: theme.spacing(2)
      }
    },
    container: {
      maxWidth: 1000,
      width: '100%',
      borderTop: `1px solid ${theme.palette.borderColor}`,
    },
    contactButton: {
      fontSize: 18
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(3)
    },
    footerDescription: {
      fontSize: 12,
      fontWeight: 'bold',
      width: 660,
      textAlign: 'center',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
  };
};

const Discover = ({ classes, defaultLocation }) => {
  const expertises = useSelector(state => state.expertise.data, []);
  const locations = useSelector(state => state.location.data, []);
  const recommends = useSelector(state => state.recommend.discover, []);
  const userRecommends = useSelector(state => state.recommend.user, []);
  const { user } = useSelector(state => state.auth, []);
  const dispatch = useDispatch();

  const [locationOptions, setLocationOptions] = useState([]);
  const [expertiseOptions, setExpertiseOptions] = useState([]);
  const [verifiedRecommends, setVerifiedRecommends] = useState([]);
  const expertise = useInput('default');
  const experiencedYear = useInput(years[0].value);
  const location = useInput(defaultLocation);
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setLocations());
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let locationsData = locations.map(({ name }) => (name));
    locationsData = [defaultLocation, ...locationsData]
    setLocationOptions(locationsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  useEffect(() => {
    let expertisesData = expertises.map(({ name }) => ({ label: name, value: name }));
    expertisesData = [{ label: 'All expertises', value: 'default' }, ...expertisesData]
    setExpertiseOptions(expertisesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertises]);

  useEffect(() => {
    const verifiedRecommendsData = userRecommends.filter((recommend) => recommend.verified === true);
    setVerifiedRecommends(verifiedRecommendsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRecommends]);

  useEffect(() => {
    if ((user.role === roles.ADMIN_ROLE) || (verifiedRecommends.length >= 3 && user.verified)) {
      const filter = {
        expertiseArea: expertise.value,
        experiencedYear: parseInt(experiencedYear.value),
        location: location.value === defaultLocation ? 'default' : location.value,
        step: 0
      };

      dispatch(setDiscoverRecommends(true, filter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertise.value, experiencedYear.value, location.value, verifiedRecommends]);

  useEffect(() => {
    if ((user.role === roles.ADMIN_ROLE) || (verifiedRecommends.length >= 3 && user.verified)) {
      if (step === recommends.length) {
        const filter = {
          expertiseArea: expertise.value,
          experiencedYear: parseInt(experiencedYear.value),
          location: location.value === defaultLocation ? 'default' : location.value,
          step: step
        };

        dispatch(setDiscoverRecommends(false, filter));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const onInit = () => {
    expertise.onChange('default');
    experiencedYear.onChange(years[0].value);
    location.onChange(defaultLocation);
    setStep(0);
  }

  const locationChangeHandler = (value) => {
    if (isEmpty(value)) {
      location.onChange(defaultLocation);
    } else {
      location.onChange(value);
    }
  }

  const stepButtonHandler = (stepCount) => () => {
    setStep(stepCount);
  }

  const submitHandler = () => {
    setShowModal(true);
  }

  const comfirmModalHandler = (message) => {
    const data = {
      senderId: user.id,
      candidateId: recommends[step].candidate._id,
      message
    }
    CONTACT_SERVICE.addContact(data);
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
      || verifiedRecommends.length < 3
      || !user.verified
  }

  const renderFilter = () => {
    return (
      <div className={classes.filterContainer}>
        <CustomSelect
          onChange={expertise.onChange}
          value={expertise.value}
          options={expertiseOptions}
          classes={{ root: classes.select }} />
        <CustomSelect
          onChange={experiencedYear.onChange}
          value={experiencedYear.value}
          options={years}
          classes={{ root: classes.select }} />
        <CustomAutocomplete
          onChange={locationChangeHandler}
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
        <div className={classes.footerDescription}>
          You currently have access to all recommendations made by {groupNames}
          members. If you’d like to expand your group, please share your group
          link and password with other recommenders. You will have an opportunity
          to access recommendations made by other groups in the future. We will
          notify you when that feature becomes available!
        </div>
      )
    }
  }

  const renderBottons = () => {
    if (!isNotShowRecommends()) {
      return (
        <div className={classes.buttonContainer}>
          <PrimaryButton
            classes={{ root: classes.contactButton }}
            onClick={submitHandler}>
            {`Contact ${recommends[step].candidate.firstName}`}
          </PrimaryButton>
          <div>
            <PrevIconButton
              onClick={stepButtonHandler(step - 1)}
              disabled={step === 0} />
            <NextIconButton
              onClick={stepButtonHandler(step + 1)}>
            </NextIconButton>
          </div>
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
      <div className={classes.container}>
        {
          isNotShowRecommends()
            ? <ExceptProfile
              isNotApproved={verifiedRecommends.length < 3 || !user.verified}
              onInit={onInit} />
            : <DiscoverCard
              recommend={recommends[step]} />
        }
      </div>
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

Discover.defaultProps = {
  defaultLocation: 'All locations'
};

export default withStyles(styles, { withTheme: true })(Discover);
