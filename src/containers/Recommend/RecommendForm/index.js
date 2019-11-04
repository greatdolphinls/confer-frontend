import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as RECOMMEND_SERVICE from '../../../services/recommend';
import {
  setExpertises,
  setRelationships,
  setSkills,
  setStrengths
} from '../../../actions';
import {
  CustomSelectValidator,
  CustomMultiSelect,
  PrimaryButton
} from '../../../components';
import {
  RecommendFormHeader,
  RecommendMail,
  SuccessRecommendModal
} from './Shared';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import { useInput } from '../../../utils/hooks';
import { isEmpty, showErrorToast } from '../../../utils/utility';
import CelebrateImage from '../../../assets/img/icons/celebrate.svg'

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
      fontWeight: 'bold',
      marginRight: theme.spacing(2),
      lineHeight: `${theme.spacing(5)}px`,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16
      }
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
    buttonContainer: {
      marginBottom: theme.spacing(5),
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      width: 'fit-content',
      marginRight: theme.spacing(1)
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
  const expertises = useSelector(state => state.expertise.data, []);
  const relationships = useSelector(state => state.relationship.data, []);
  const skills = useSelector(state => state.skill.data, []);
  const strengths = useSelector(state => state.strength.data, []);
  const dispatch = useDispatch();

  const firstName = useInput('');
  const lastName = useInput('');
  const expertise = useInput('');
  const whyGreat = useInput('');
  const howYouKnow = useInput('');
  const email = useInput('');
  const linkedInURL = useInput('');
  const relationship = useInput('');
  const accomplishment = useInput('');
  const subExpertises = useInput([]);
  const skill = useInput([]);
  const strength = useInput([]);
  const [expertiseOptions, setExpertiseOptions] = useState([]);
  const [subExpertiseOptions, setSubExpertiseOptions] = useState([]);
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [strengthOptions, setStrengthOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setRelationships());
    dispatch(setSkills());
    dispatch(setStrengths());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const expertisesData = expertises.map(({ name }) => ({ label: name, value: name }));
    setExpertiseOptions(expertisesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertises]);

  useEffect(() => {
    const relationshipsData = relationships.map(({ name }) => ({ label: name, value: name }));
    setRelationshipOptions(relationshipsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationships]);

  useEffect(() => {
    const skillsData = skills.map(({ name }) => ({ label: name, value: name }));
    setSkillOptions(skillsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  useEffect(() => {
    const strengthsData = strengths.map(({ name }) => ({ label: name, value: name }));
    setStrengthOptions(strengthsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strengths]);

  useEffect(() => {
    const selectedExpertise = expertises.find(({ name }) => (name === expertise.value));
    const subExpertises = selectedExpertise ? selectedExpertise.subExpertises : [];
    const subExpertisesData = subExpertises.map((name) => ({ label: name, value: name }));
    setSubExpertiseOptions(subExpertisesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertise.value]);

  const comfirmModalHandler = () => {
    setShowModal(false);
    history.push(pageLinks.RecommendCount.url);
  }

  const submitHandler = async () => {
    if (isEmpty(expertise.value)
      || isEmpty(relationship.value)
      || isEmpty(subExpertises.value)
      || isEmpty(skill.value)
      || isEmpty(strength.value)
    ) {
      showErrorToast(notifications.RECOMMEND_FORM_VALIDATION_ERROR);
      return null;
    }

    try {
      const data = {
        recommend: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          linkedInURL: linkedInURL.value,
          expertiseArea: expertise.value,
          subExpertises: subExpertises.value,
          howYouKnow: howYouKnow.value,
          whyGreat: whyGreat.value,
          whichCapacity: relationship.value,
          skills: skill.value,
          strengths: strength.value,
          accomplishment: accomplishment.value
        }
      };

      await RECOMMEND_SERVICE.addRecommendByUser(data);
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
          value={firstName.value}
          onChange={firstName.onChange}
          validators={['required']}
          errorMessages={['First Name cannot be empty']} />
        <TextValidator
          name='lastName'
          placeholder='Last name'
          className={classes.smallInput}
          value={lastName.value}
          onChange={lastName.onChange}
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
          value={expertise.value}
          changed={expertise.onChange}
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
          {firstName.value || '[First name]'} is/was my
        </Typography>
        <CustomSelectValidator
          placeholder='Select relationship'
          classes={{ root: classes.middleInput }}
          value={relationship.value}
          changed={relationship.onChange}
          items={relationshipOptions} />
        <Typography className={classes.description}>
          when
        </Typography>
        <TextValidator
          multiline={true}
          name='howYouKnow'
          placeholder='Share how and how long you know this person...'
          className={classes.largeInput}
          value={howYouKnow.value}
          onChange={howYouKnow.onChange}
          validators={['required']}
          errorMessages={['Please input this data']} />
      </div>
    );
  }

  const skillAndStrengthRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          {firstName.value || '[First name]'} exhibits exceptional
        </Typography>
        <CustomMultiSelect
          placeholder='Select up to 2 skills'
          classes={{ root: classes.middleInput }}
          value={skill.value}
          changed={skill.onChange}
          items={skillOptions} />
        <Typography className={classes.description}>
          skills and stands out for their
        </Typography>
        <CustomMultiSelect
          placeholder='Select up to 2 strengths'
          classes={{ root: classes.middleInput }}
          value={strength.value}
          changed={strength.onChange}
          items={strengthOptions} />
      </div>
    );
  }

  const subExpertisesRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.description}>
          {firstName.value || '[First name]'} would be my go-to with
        </Typography>
        <CustomMultiSelect
          placeholder='Select or write scenario...'
          classes={{ root: classes.middleInput }}
          value={subExpertises.value}
          changed={subExpertises.onChange}
          items={subExpertiseOptions} />
      </div>
    );
  }

  const accomplishmentRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          and want to highlight the time that {firstName.value || '[First name]'}
        </Typography>
        <TextValidator
          multiline={true}
          name='whyGreat'
          placeholder='Share one of their top accomplishments...'
          className={classes.largeInput}
          value={accomplishment.value}
          onChange={accomplishment.onChange}
          validators={['required']}
          errorMessages={['Please input this data']} />
      </div>
    );
  }

  const whyGreatRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          In summary, {firstName.value || '[First name]'} is one of the
          best people I have worked with because
        </Typography>
        <TextValidator
          multiline={true}
          name='whyGreat'
          placeholder='share any other reason why they’re great'
          className={classes.largeInput}
          value={whyGreat.value}
          onChange={whyGreat.onChange}
          validators={['required']}
          errorMessages={['Please input this data']} />
      </div>
    );
  }

  const emailAndLinkedInRender = () => {
    return (
      <div className={classNames(classes.container, classes.bottom)}>
        <Typography className={classes.description}>
          I am excited to recognize {firstName.value || '[First name]'}
          {' for their excellent work and give them the recognition they deserve.'}
        </Typography>
        <Typography className={classes.description}>

          {' that I have recommended them at'}
        </Typography>
        <TextValidator
          name='email'
          placeholder='their email address'
          className={classes.middleInput}
          value={email.value}
          onChange={email.onChange}
          validators={['required']}
          errorMessages={['Please input this data']} />
        <Typography className={classes.description}>
          and find them on LinkedIn at
        </Typography>
        <TextValidator
          name='linkedInURL'
          placeholder='https://www.linkedin.com/...'
          helperText='[Optional]'
          className={classes.middleInput}
          value={linkedInURL.value}
          onChange={linkedInURL.onChange} />
        .
      </div>
    );
  }

  const submitButtonContainer = () => {
    return (
      <div className={classes.buttonContainer}>
        <PrimaryButton classes={{ root: classes.button }} type='submit'>
          SUBMIT RECOMMENDATION
        </PrimaryButton>
        <img
          src={CelebrateImage}
          alt='CelebrateImage' />
      </div>
    );
  }

  return (
    <main className={classes.root}>
      <RecommendFormHeader />
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
        <RecommendMail />
        {submitButtonContainer()}
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
