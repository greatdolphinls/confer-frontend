
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import * as CONTACT_SERVICE from '../../services/contact';
import * as STAR_SERVICE from '../../services/star';
import {
  setExpertises,
  setLocations,
  setUserRecommends,
  setDiscoverRecommends,
  editDiscoverRecommend,
  removeDiscoverRecommend,
  setLoadingStatus
} from '../../actions';
import {
  DiscoverCard,
  CustomFilterSelect,
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
import notifications from '../../constants/notifications';
import { roles } from '../../constants/roles';
import { isEmpty, showErrorToast, showInfoToast } from '../../utils/utility';

import DefaultStarIcon from '../../assets/img/icons/default-star.svg';
import ActiveStarIcon from '../../assets/img/icons/active-star.svg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(2)
    },
    filterDescription: {
      fontSize: 14,
      marginBottom: theme.spacing(1)
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      paddingBottom: theme.spacing(3.5),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    select: {
      width: 200,
      margin: `0 ${theme.spacing(3)}px`,
      [theme.breakpoints.down('sm')]: {
        margin: `0 ${theme.spacing(1.5)}px`,
        width: 160
      },
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        width: '100%',
        marginBottom: theme.spacing(2)
      }
    },
    saveFilter: {
      display: 'flex',
      alignItems: 'center',
      margin: `0 ${theme.spacing(3)}px`,
      cursor: 'pointer',
      opacity: 0.6,
      fontSize: 12,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        margin: `0 ${theme.spacing(1.5)}px`
      },
      [theme.breakpoints.down('xs')]: {
        margin: 0
      }
    },
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: `1px solid ${theme.palette.borderColor}`,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1)
    },
    nextButtonContainer: {
      marginTop: 215
    },
    contactButton: {
      fontSize: 14
    },
    desktopStepButton: {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    mobileStepButton: {
      display: 'none',
      '& img': {
        width: 20,
        height: 20
      },
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      }
    },
    saveAsCandidate: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      opacity: 0.6,
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: theme.spacing(3)
    },
    starIcon: {
      marginRight: theme.spacing(0.5)
    }
  };
};

const Discover = ({ classes, defaultLocation }) => {
  const expertiseDefaultOptions = useSelector(state => state.expertise.options, []);
  const locationDefaultOptions = useSelector(state => state.location.options, []);
  const recommends = useSelector(state => state.recommend.discover, []);
  const userRecommends = useSelector(state => state.recommend.user, []);
  const { user } = useSelector(state => state.auth, []);
  const { loading } = useSelector(state => state.loading, true);
  const dispatch = useDispatch();

  const locationOptions = useMemo(() => ([defaultLocation, ...locationDefaultOptions])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [locationDefaultOptions]);

  const expertiseOptions = useMemo(() => ([{ label: 'All expertises', value: 'default' }, ...expertiseDefaultOptions])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [expertiseDefaultOptions]);

  const verifiedRecommends = useMemo(() => userRecommends.filter((recommend) => recommend.verified === true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [userRecommends]);

  const expertise = useInput('default');
  const experiencedYear = useInput(years[0].value);
  const location = useInput(defaultLocation);
  const saveFilter = useInput(false);
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setLocations());
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStep(0);
    // if ((user.role === roles.ADMIN_ROLE) || (verifiedRecommends.length >= 3 && user.verified)) {  // comment for test
    if ((user.role === roles.ADMIN_ROLE) || user.verified) {
      getRecommends(true, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertise.value, experiencedYear.value, location.value, saveFilter.value, verifiedRecommends]);

  useEffect(() => {
    // if ((user.role === roles.ADMIN_ROLE) || (verifiedRecommends.length >= 3 && user.verified)) {  // comment for test
    if ((user.role === roles.ADMIN_ROLE) || user.verified) {
      if (step === recommends.length) {
        getRecommends(false, step);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const getRecommends = async (refresh, index) => {
    await dispatch(setLoadingStatus({ loading: true }));
    const filter = {
      expertiseArea: expertise.value,
      experiencedYear: parseInt(experiencedYear.value),
      location: location.value === defaultLocation ? 'default' : location.value,
      saved: saveFilter.value,
      step: index
    };
    await dispatch(setDiscoverRecommends(refresh, filter));
    await dispatch(setLoadingStatus({ loading: false }));
  }

  const onInit = () => {
    expertise.onSet('default');
    experiencedYear.onSet(years[0].value);
    location.onSet(defaultLocation);
    saveFilter.onSet(false);
    setStep(0);
  }

  const locationChangeHandler = (value) => {
    if (isEmpty(value)) {
      location.onChange(defaultLocation);
    } else {
      location.onChange(value);
    }
  }

  const saveFilterHandler = () => {
    saveFilter.onSet(!saveFilter.value);
  }

  const saveAsCandidateHandler = (isSaved) => async () => {
    await dispatch(setLoadingStatus({ loading: true }));
    try {
      let recommend = {};
      let message = notifications.SUCCESS_SAVE_CANDIDATE;

      if (isSaved) {
        await STAR_SERVICE.removeStar(recommends[step].star[0]._id);
        recommend = {
          ...recommends[step],
          star: [],
          saved: false
        }
        message = notifications.SUCCESS_UNSAVE_CANDIDATE;
      } else {
        const star = {
          senderId: user.id,
          candidateId: recommends[step].candidate._id,
        }
        const { data } = await STAR_SERVICE.addStar(star);
        recommend = {
          ...recommends[step],
          star: [data],
          saved: true
        }
      }

      if (saveFilter.value) {
        await dispatch(removeDiscoverRecommend(step));
      } else {
        await dispatch(editDiscoverRecommend(recommend, step));
      }
      showInfoToast(message);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    await dispatch(setLoadingStatus({ loading: false }));
  }

  const stepButtonHandler = (stepCount) => () => {
    setStep(stepCount);
  }

  const submitHandler = () => {
    setShowModal(true);
  }

  const comfirmModalHandler = async (message) => {
    dispatch(setLoadingStatus({ loading: true }));
    try {
      const contact = {
        senderId: user.id,
        candidateId: recommends[step].candidate._id,
        message
      }
      const { data } = await CONTACT_SERVICE.addContact(contact);
      const recommend = {
        ...recommends[step],
        contact: data
      }

      dispatch(editDiscoverRecommend(recommend, step));
      showInfoToast(notifications.SUCCESS_CONTACT_CANDIDATE)
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setShowModal(false);
    dispatch(setLoadingStatus({ loading: false }));
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }

  const isNotShowRecommends = useMemo(() => {
    if (user.role === roles.ADMIN_ROLE) {
      return recommends.length === 0
        || step === recommends.length
        || !user.verified
    }

    return recommends.length === 0
      || step === recommends.length
      // || verifiedRecommends.length < 3 // comment for test
      || !user.verified
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [recommends, verifiedRecommends, user]);

  const isNotApproved = useMemo(() => {
    if (user.role === roles.ADMIN_ROLE) {
      return false
    }

    return !user.verified
    // || verifiedRecommends.length < 3 // comment for test
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [verifiedRecommends, user]);

  const renderFilter = () => {
    return (
      <div className={classes.filterContainer}>
        <CustomFilterSelect
          onChange={expertise.onChange}
          value={expertise.value}
          options={expertiseOptions}
          classes={{ root: classes.select }} />
        <CustomFilterSelect
          onChange={experiencedYear.onChange}
          value={experiencedYear.value}
          options={years}
          classes={{ root: classes.select }} />
        <CustomAutocomplete
          onChange={locationChangeHandler}
          value={location.value}
          options={locationOptions}
          classes={{ root: classes.select }} />
        <Typography
          className={classes.saveFilter}
          onClick={saveFilterHandler}>
          <img
            alt='StarIcon'
            src={saveFilter.value ? ActiveStarIcon : DefaultStarIcon}
            className={classes.starIcon} />
          SAVED CANDIDATES ONLY
        </Typography>
      </div>
    );
  }

  const renderContainer = () => {
    if (!isNotShowRecommends && !isEmpty(recommends[step])) {
      return (
        <div className={classes.container}>
          <div className={classes.nextButtonContainer}>
            <PrevIconButton
              classes={{ root: classes.desktopStepButton }}
              onClick={stepButtonHandler(step - 1)}
              disabled={step === 0} />
          </div>
          <DiscoverCard
            recommend={recommends[step]} />
          <div className={classes.nextButtonContainer}>
            <NextIconButton
              classes={{ root: classes.desktopStepButton }}
              onClick={stepButtonHandler(step + 1)} />
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.container}>
          <ExceptProfile
            isNotApproved={isNotApproved}
            onInit={onInit} />
        </div>
      )
    }
  }

  const renderBottons = () => {
    if (!isNotShowRecommends && !isEmpty(recommends[step])) {
      const isContacted = !isEmpty(recommends[step].contact || '');
      const isSaved = recommends[step].saved;
      return (
        <>
          <div className={classes.buttonContainer}>
            <PrevIconButton
              classes={{ root: classes.mobileStepButton }}
              onClick={stepButtonHandler(step - 1)}
              disabled={step === 0} />
            <PrimaryButton
              disabled={isContacted}
              classes={{ root: classes.contactButton }}
              onClick={submitHandler}>
              {isContacted ? 'YOU’VE CONTACTED ' : 'CONTACT '}
              {recommends[step].candidate.firstName}
            </PrimaryButton>
            <NextIconButton
              classes={{ root: classes.mobileStepButton }}
              onClick={stepButtonHandler(step + 1)} />
          </div>
          <Typography
            className={classes.saveAsCandidate}
            onClick={saveAsCandidateHandler(isSaved)}>
            <img
              alt='StarIcon'
              src={isSaved ? ActiveStarIcon : DefaultStarIcon}
              className={classes.starIcon} />
            {isSaved ? 'SAVED AS A CANDIDATE' : 'SAVE AS A CANDIDATE'}
          </Typography>
        </>
      )
    }
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.filterDescription}>
        Tell us about the role you are looking to fill:
      </Typography>
      {renderFilter()}
      {!loading && renderContainer()}
      {renderBottons()}
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
