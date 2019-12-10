import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as RECOMMEND_SERVICE from '../../../services/recommend';
import {
  setCurrentRecommend,
  editCurrentRecommend,
  setExpertises,
  setRelationships,
  setSkills,
  setStrengths
} from '../../../actions';
import {
  CustomSelectValidator,
  CustomLimitMultiSelect,
  PrimaryButton
} from '../../../components';
import {
  RecommendFormHeader,
  RecommendMail,
  SuccessRecommendModal
} from './Shared';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import { isEmpty, showErrorToast } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${theme.spacing(6)}px`,
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      lineHeight: `${theme.spacing(5)}px`
    },
    description: {
      fontSize: 20,
      marginRight: theme.spacing(2),
      lineHeight: `${theme.spacing(5)}px`,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16
      }
    },
    errorDescription: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: theme.spacing(2),
      lineHeight: `${theme.spacing(5)}px`,
      borderBottom: `1px solid ${theme.palette.buttonColor}`
    },
    smallInput: {
      width: 120,
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: theme.spacing(2)
    },
    middleInput: {
      width: 260,
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    largeInput: {
      width: '100%',
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: theme.spacing(2)
    },
    button: {
      width: 'fit-content',
      marginBottom: theme.spacing(5)
    },
    check: {
      color: `${theme.palette.buttonColor} !important`
    },
    termsAndPrivacy: {
      fontSize: 12,
      opacity: 0.6,
      width: 430
    },
    bottom: {
      marginBottom: theme.spacing(7)
    }
  };
};

const RecommendForm = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const recommend = useSelector(state => state.recommend.current, {});
  const expertises = useSelector(state => state.expertise.data, []);
  const expertiseOptions = useSelector(state => state.expertise.options, []);
  const relationshipOptions = useSelector(state => state.relationship.options, []);
  const skillOptions = useSelector(state => state.skill.options, []);
  const strengthOptions = useSelector(state => state.strength.options, []);
  const dispatch = useDispatch();

  const [subExpertiseOptions, setSubExpertiseOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setRelationships());
    dispatch(setSkills());
    dispatch(setStrengths());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectedExpertise = expertises.find(({ name }) => (name === recommend.expertiseArea));
    const subExpertises = selectedExpertise ? selectedExpertise.subExpertises : [];
    const subExpertisesData = subExpertises.map((name) => ({ label: name, value: name }));
    setSubExpertiseOptions(subExpertisesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommend.expertiseArea]);

  const comfirmModalHandler = () => {
    setShowModal(false);
    history.push(pageLinks.RecommendCount.url);
  }

  const onFieldChangeHandler = (name) => async (event) => {
    let value = event;
    if (!!event) {
      value = !!event.target ? event.target.value : event;
    }

    if (name === 'email') {
      value = value.replace(/ /g, '');
    }

    let data = { [name]: value };

    if (name === 'expertiseArea') {
      data = {
        ...data,
        subExpertises: []
      }
    }

    dispatch(editCurrentRecommend(data));
  }

  const submitHandler = async () => {
    if (isEmpty(recommend.expertiseArea)
      || isEmpty(recommend.relationship)
      || isEmpty(recommend.subExpertises)
      || isEmpty(recommend.skill)
      || isEmpty(recommend.strength)
    ) {
      showErrorToast(notifications.FORM_VALIDATION_ERROR);
      return null;
    }

    if (user.email === recommend.email) {
      showErrorToast(notifications.RECOMMEND_FORM_CURRENT_USER_ERROR);
      return null;
    }

    try {
      const data = {
        recommend
      };

      await RECOMMEND_SERVICE.addRecommendByUser(data);
      await dispatch(setCurrentRecommend({}));
      setShowModal(true);
    } catch (error) {
      // TODO: axios handling module
      console.log('great dolphin : [containers Recommend Form submitHandler] error => ', error);
      if (error.response) {
        const { message: errorMessage } = error.response.data;
        showErrorToast(errorMessage);
      }
    }
  }

  const nameContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.description}>
          I would like to strongly recommend
        </Typography>
        <TextValidator
          name='firstName'
          placeholder='First name'
          className={classes.smallInput}
          value={recommend.firstName || ''}
          onChange={onFieldChangeHandler('firstName')}
          validators={['required']}
          errorMessages={['First Name cannot be empty']} />
        <TextValidator
          name='lastName'
          placeholder='Last name'
          className={classes.smallInput}
          value={recommend.lastName || ''}
          onChange={onFieldChangeHandler('lastName')}
          validators={['required']}
          errorMessages={['Last Name cannot be empty']} />
      </div>
    );
  }

  const experienceContanerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.description}>
          who is an outstanding
        </Typography>
        <CustomSelectValidator
          placeholder='Select discipline'
          classes={{ root: classes.middleInput }}
          value={recommend.expertiseArea}
          changed={onFieldChangeHandler('expertiseArea')}
          items={expertiseOptions} />
        <Typography className={classes.description}>
          professional.
        </Typography>
      </div>
    );
  }

  const relationshipAndHowYouKnowRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          {recommend.firstName || '[First name]'} is/was my
        </Typography>
        <CustomSelectValidator
          placeholder='Select relationship'
          classes={{ root: classes.middleInput }}
          value={recommend.relationship}
          changed={onFieldChangeHandler('relationship')}
          items={relationshipOptions} />
        <Typography className={classes.description}>
          when
        </Typography>
        <TextValidator
          multiline={true}
          name='howYouKnow'
          placeholder='Share how and how long you know this person...'
          className={classes.largeInput}
          value={recommend.howYouKnow}
          onChange={onFieldChangeHandler('howYouKnow')}
          validators={['required', 'matchRegexp:^.{25,}']}
          errorMessages={['This field cannot be empty', 'This field should be at least 25 characters']} />
      </div>
    );
  }

  const skillAndStrengthRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          {recommend.firstName || '[First name]'} exhibits exceptional
        </Typography>
        <CustomLimitMultiSelect
          placeholder='Select up to 2 skills'
          classes={{ root: classes.middleInput }}
          value={recommend.skill || []}
          changed={onFieldChangeHandler('skill')}
          items={skillOptions} />
        <Typography className={classes.description}>
          skills and stands out for their
        </Typography>
        <CustomLimitMultiSelect
          placeholder='Select up to 2 strengths'
          classes={{ root: classes.middleInput }}
          value={recommend.strength || []}
          changed={onFieldChangeHandler('strength')}
          items={strengthOptions} />
      </div>
    );
  }

  const subExpertiseSelectRender = () => {
    if (!!recommend.expertiseArea) {
      return (
        <CustomLimitMultiSelect
          placeholder='Select up to 2 or write your own'
          classes={{ root: classes.middleInput }}
          value={recommend.subExpertises || []}
          changed={onFieldChangeHandler('subExpertises')}
          items={subExpertiseOptions} />
      )
    } else {
      return (
        <Typography className={classes.errorDescription}>
          scenario (please select discipline first)
        </Typography>
      )
    }
  }

  const subExpertisesRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.description}>
          {recommend.firstName || '[First name]'} would be my go-to with
        </Typography>
        {subExpertiseSelectRender()}
      </div>
    );
  }

  const accomplishmentRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          and I want to highlight the time that {recommend.firstName || '[First name]'}
        </Typography>
        <TextValidator
          multiline={true}
          name='whyGreat'
          placeholder='Share one of their top accomplishments...'
          className={classes.largeInput}
          value={recommend.accomplishment || ''}
          onChange={onFieldChangeHandler('accomplishment')}
          validators={['required', 'matchRegexp:^.{150,}']}
          errorMessages={['This field cannot be empty', 'This field should be at least 150 characters']} />
      </div>
    );
  }

  const whyGreatRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          In summary, {recommend.firstName || '[First name]'} is one of the
          best people I have worked with because
        </Typography>
        <TextValidator
          multiline={true}
          name='whyGreat'
          placeholder='share any other reason why they’re great'
          className={classes.largeInput}
          value={recommend.whyGreat || ''}
          onChange={onFieldChangeHandler('whyGreat')}
          validators={['required', 'matchRegexp:^.{250,}']}
          errorMessages={['This field cannot be empty', 'This field should be at least 250 characters']} />
      </div>
    );
  }

  const emailAndLinkedInRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          I am excited to recognize {recommend.firstName || '[First name]'}
          {' for their excellent work and give them the recognition they deserve.'}
        </Typography>
        <Typography className={classes.description}>
          You can notify {recommend.firstName || '[First name]'}
          {' that I have recommended them at'}
        </Typography>
        <TextValidator
          name='email'
          placeholder='their email address'
          className={classes.middleInput}
          value={recommend.email || ''}
          onChange={onFieldChangeHandler('email')}
          validators={['isEmail', 'required']}
          errorMessages={['Email is not valid', 'Email cannot be empty']} />
        <Typography className={classes.description}>
          and find them on LinkedIn at
        </Typography>
        <TextValidator
          name='linkedInURL'
          placeholder='https://www.linkedin.com/...'
          helperText='[Optional]'
          className={classes.middleInput}
          value={recommend.linkedInURL || ''}
          onChange={onFieldChangeHandler('linkedInURL')} />
        .
      </div>
    );
  }

  return (
    <main className={classes.root}>
      <RecommendFormHeader
        history={history} />
      <ValidatorForm
        className={classes.form}
        onSubmit={submitHandler}
        onError={errors => console.log(errors)}>
        {nameContainerRender()}
        {experienceContanerRender()}
        {relationshipAndHowYouKnowRender()}
        {skillAndStrengthRender()}
        {subExpertisesRender()}
        {accomplishmentRender()}
        {whyGreatRender()}
        {emailAndLinkedInRender()}
        <RecommendMail
          firstName={recommend.firstName} />
        <PrimaryButton
          classes={{ root: classes.button }}
          type='submit'>
          SUBMIT RECOMMENDATION
        </PrimaryButton>
      </ValidatorForm>
      {showModal &&
        <SuccessRecommendModal
          opened={showModal}
          onConfirm={comfirmModalHandler} />
      }
    </main>
  );
};

RecommendForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendForm);
