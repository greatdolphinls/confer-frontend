import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { setExpertises, setRelationships } from '../../../actions';
import {
  CustomSelectValidator,
  CustomTagSelect,
  CustomTagMultiSelect,
  PrimaryButton
} from '../../../components';
import { RecommendLayout, SuccessRecommendModal } from '../Shared';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import { useInput } from '../../../utils/hooks';
import { removeItemWithSlice } from '../../../utils/utility';
import { addRecommend } from '../../../services/recommend';

const styles = theme => {
  return {
    root: {},
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    halfInput: {
      width: '50%',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    linkedInInput: {
      width: '50%',
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    fullInput: {
      marginBottom: theme.spacing(3),
    },
    button: {
      width: 94,
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    linkedIn: {
      fontSize: 12,
      marginBottom: theme.spacing(5)
    },
    description: {
      fontSize: 16,
      marginBottom: theme.spacing(3)
    },
    explain: {
      fontSize: 12,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  };
};

const RecommendForm = ({ classes, history }) => {
  const expertises = useSelector(state => state.expertise.data, []);
  const relationships = useSelector(state => state.relationship.data, []);
  const dispatch = useDispatch();

  const firstName = useInput('');
  const lastName = useInput('');
  const expertise = useInput('');
  const whyGreat = useInput('');
  const howYouKnow = useInput('');
  const email = useInput('');
  const linkedInURL = useInput('');
  const [relationship, setRelationship] = useState('');
  const [selectedSubExpertises, setSelectedSubExpertises] = useState([]);
  const [selectedStep, setSelectedStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(setExpertises());
    dispatch(setRelationships());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!expertise.value && expertises.length !== 0) {
      expertise.onChange(expertises[0].name);
    }
    if (!relationship.value && relationships.length !== 0) {
      setRelationship(relationships[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertises, relationships]);

  const expertiseItems = expertises.map(({ name }) => ({ label: name, value: name }));
  const selectedExpertise = expertises.find(({ name }) => (name === expertise.value));
  const subExpertises = selectedExpertise ? selectedExpertise.subExpertises : [];
  const relationshipList = relationships.map(({ name }) => name);

  const relationshipSelectHandler = (value) => () => {
    setRelationship(value);
  }

  const subExpertisesSelectHandler = (value) => () => {
    const index = selectedSubExpertises.findIndex((subExpertise) => (subExpertise === value));
    if (index === -1) {
      setSelectedSubExpertises([...selectedSubExpertises, value]);
    } else {
      setSelectedSubExpertises(removeItemWithSlice(selectedSubExpertises, index))
    }
  }

  const comfirmModalHandler = () => {
    setShowModal(false);
    history.push(pageLinks.RecommendCount.url);
  }

  const setStepHandler = (step) => {
    setSelectedStep(step);
  }

  const stepOneHandler = () => {
    if (!relationship) {
      toast.error(notifications.RECOMMEND_FORM_VALIDATION_ERROR, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      setSelectedStep(2);
    }
  }

  const stepTwoHandler = async () => {
    try {
      const data = {
        recommend: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          linkedInURL: linkedInURL.value,
          expertiseArea: expertise.value,
          subExpertises: selectedSubExpertises,
          howYouKnow: howYouKnow.value,
          whyGreat: whyGreat.value,
          whichCapacity: relationship
        }
      };
      await addRecommend(data);
      setShowModal(true);
    } catch (error) {
      // TODO: axios handling module
      console.log('great dolphin : [containers Recommend Form submitHandler] error => ', error);
      if (error.response) {
        const { message: errorMessage } = error.response.data;
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }
  }

  const renderStepOne = () => {
    if (selectedStep === 1) {
      return (
        <ValidatorForm
          className={classes.form}
          onSubmit={stepOneHandler}
          onError={errors => console.log(errors)}>
          <TextValidator
            name='firstName'
            label='First Name*'
            className={classes.halfInput}
            value={firstName.value}
            onChange={firstName.onChange}
            validators={['required']}
            errorMessages={['First Name cannot be empty']} />
          <TextValidator
            name='lastName'
            label='Last Name*'
            className={classes.halfInput}
            value={lastName.value}
            onChange={lastName.onChange}
            validators={['required']}
            errorMessages={['Last Name cannot be empty']} />
          <CustomSelectValidator
            label='What best describes their area of expertise?*'
            classes={{ root: classes.halfInput }}
            value={expertise.value}
            changed={expertise.onChange}
            items={expertiseItems} />
          <CustomTagMultiSelect
            label='Do they particularly excel in any of the following areas? (select multiple)'
            values={selectedSubExpertises}
            changed={subExpertisesSelectHandler}
            items={subExpertises} />
          <CustomTagSelect
            label='What is / was your working relationship?* The person is / was your...'
            value={relationship}
            changed={relationshipSelectHandler}
            items={relationshipList} />
          <TextValidator
            name='howYouKnow'
            label='How do you know this person?*'
            className={classes.fullInput}
            value={howYouKnow.value}
            onChange={howYouKnow.onChange}
            validators={['required']}
            placeholder='We worked together for 3 years at...'
            errorMessages={['This field cannot be empty']} />
          <PrimaryButton classes={{ root: classes.button }} type='submit'>
            Next
          </PrimaryButton>
        </ValidatorForm>
      );
    }
  }

  const renderStepTwo = () => {
    if (selectedStep === 2) {
      return (
        <ValidatorForm
          className={classes.form}
          onSubmit={stepTwoHandler}
          onError={errors => console.log(errors)}>
          <TextValidator
            fullWidth
            margin='normal'
            multiline={true}
            rows={5}
            rowsMax={5}
            name='whyGreat'
            label='Why is this person among the best people you have worked with?*'
            placeholder={`Best salesperson, had 2x higher conversion rate than anyone else, but was a strong team player. Personally sourced, hired and managed 20 salespeople in one year.`}
            className={classes.fullInput}
            value={whyGreat.value}
            onChange={whyGreat.onChange}
            validators={['required']}
            errorMessages={['Please input this data']} />
          <TextValidator
            name='email'
            label='Email* (personal email preferred)'
            className={classes.halfInput}
            value={email.value}
            onChange={email.onChange}
            validators={['isEmail', 'required']}
            errorMessages={['Email is not valid', 'Email cannot be empty']} />
          <TextValidator
            name='linkedInURL'
            label='LinkedIn URL'
            className={classes.linkedInInput}
            value={linkedInURL.value}
            onChange={linkedInURL.onChange} />
          <Typography className={classes.linkedIn}>
            Optional, but we want to make sure we have the right person!
          </Typography>
          <Typography className={classes.description}>
            <b>We’ll invite the person you’ve recommended to opt in to emails and edit their profile. </b>
            We’ll include your name in our invitation since we believe
            transparency is important to building trust. Want to give
            them a heads up? We’ll wait 24 hours before inviting them.
            Here’s a txt or email you can share with them if you’d like:
          </Typography>
          <Typography className={classes.explain}>
            “Hi {`${firstName.value} ${lastName.value}`} - Just want
            to give you a heads up that I recommended you for Confer.
            Confer is sourcing recommendations from professionals for
            the best people they’ve ever worked with, and you fall
            into that camp! Confer will reach out so you can learn
            more what being a part of it entails. Thanks - and congrats!”
          </Typography>
          <PrimaryButton classes={{ root: classes.button }} type='submit'>
            Submit
          </PrimaryButton>
        </ValidatorForm>
      );
    }
  }

  return (
    <RecommendLayout
      selectedStep={selectedStep}
      onSetStep={setStepHandler}
      history={history}
    >
      {renderStepOne()}
      {renderStepTwo()}
      {showModal &&
        <SuccessRecommendModal
          opened={showModal}
          onConfirm={comfirmModalHandler} />
      }
    </RecommendLayout>
  );
};

RecommendForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendForm);
