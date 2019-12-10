
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as RECOMMEND_SERVICE from '../../../../services/recommend';
import {
  setRecommends,
  removeRecommend,
  addEditRecommend,
  setExpertises,
  setRelationships,
  setSkills,
  setStrengths,
  setUsers
} from '../../../../actions';
import { ControlButtons } from '../../Shared';
import { pageLinks } from '../../../../constants/links';
import notifications from '../../../../constants/notifications';
import {
  AccordionLayout,
  EditableLayout,
  ConfirmDialog,
  EditableInput,
  EditableSelect,
  EditableLimitMultiSelect,
  EditableTextarea,
  NotFound
} from '../../../../components';
import { showErrorToast, isEmpty } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing(6)
    }
  };
};

const AdminEditRecommend = ({ classes, match, panel, history }) => {
  const recommends = useSelector(state => state.recommend.data, []);
  const users = useSelector(state => state.user.data, []);
  const expertises = useSelector(state => state.expertise.data, []);
  const expertiseOptions = useSelector(state => state.expertise.options, []);
  const relationshipOptions = useSelector(state => state.relationship.options, []);
  const skillOptions = useSelector(state => state.skill.options, []);
  const strengthOptions = useSelector(state => state.strength.options, []);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(panel);
  const [editPanel, setEditPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [recommend, setRecommend] = useState({});
  const [userOptions, setUserOptions] = useState([]);
  const [subExpertiseOptions, setSubExpertiseOptions] = useState([]);

  const isEdit = useMemo(() => panel === editPanel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [editPanel]);

  useEffect(() => {
    dispatch(setRecommends());
    dispatch(setUsers());
    dispatch(setExpertises());
    dispatch(setRelationships());
    dispatch(setSkills());
    dispatch(setStrengths());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const recommendId = match.params.recommendId;
    const selectedRecommend = recommends.find(recommend => recommend._id === recommendId);
    setRecommend(selectedRecommend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommends]);

  useEffect(() => {
    if (!isEmpty(recommend) && !isEmpty(expertises)) {
      const selectedExpertise = expertises.find(expertise => expertise.name === recommend.expertiseArea);
      let subExpertises = []
      if (!isEmpty(selectedExpertise)) {
        subExpertises = selectedExpertise.subExpertises;
      }
      const subExpertisesData = subExpertises.map((name) => ({ label: name, value: name }));
      setSubExpertiseOptions(subExpertisesData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommend, expertises]);

  useEffect(() => {
    const data = users.map((user) => ({
      ...user,
      label: user.email,
      value: user.email
    }));
    setUserOptions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const expandHandler = panel => {
    setExpanded(panel);
  };

  const editHandler = (panel) => {
    setEditPanel(panel);
  }

  const backHandler = () => {
    history.push(pageLinks.AdminRecommendList.url);
  }

  const onFieldChangeHandler = (name) => async (event) => {
    let data = {
      ...recommend,
      [name]: !!event.target ? event.target.value : event
    }

    if (name === 'expertiseArea') {
      data = {
        ...data,
        subExpertises: []
      }
    }
    setRecommend(data);
  }

  const onReferrerSelectHandler = () => async (event) => {
    const { value } = event.target;
    if (value === recommend.candidate.email) {
      showErrorToast(notifications.RECOMMEND_EMAIL_VALIDATION_ERROR);
      return null;
    }

    const selectedUser = users.find((user) => (user.email === value));
    const data = {
      ...recommend,
      referrer: selectedUser
    }
    setRecommend(data);
  }

  const onCandidateChangeHandler = (name) => async (event) => {
    const { value } = event.target;
    if (name === 'email' && value === recommend.referrer.email) {
      showErrorToast(notifications.RECOMMEND_EMAIL_VALIDATION_ERROR);
      return null;
    }

    const data = {
      ...recommend,
      candidate: {
        ...recommend.candidate,
        [name]: value
      }
    }
    setRecommend(data);
  }

  const saveHandler = async () => {
    if (!recommend.expertiseArea
      || !recommend.candidate.email
      || !recommend.candidate.firstName
      || !recommend.candidate.lastName) {
      showErrorToast(notifications.ADD_RECOMMEND_VALIDATION_ERROR);
      return null;
    }

    try {
      const { data } = await RECOMMEND_SERVICE.editRecommend(recommend);
      dispatch(addEditRecommend(data));
      history.push(pageLinks.AdminRecommendList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await RECOMMEND_SERVICE.removeRecommend(recommend._id);
      dispatch(removeRecommend(data));
      history.push(pageLinks.AdminRecommendList.url);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
  }

  const openConfirmDialogHandler = () => {
    setShowDialog(true);
  }

  const closeDialogHandler = () => {
    setShowDialog(false);
  }

  if (!isEmpty(recommend)) {
    return (
      <main className={classes.root}>
        <ControlButtons
          backLabel='back to all recommends'
          onBack={backHandler}
          onSave={saveHandler}
          onDelete={openConfirmDialogHandler}
        />
        <AccordionLayout
          title='Recommend'
          panel={panel}
          onExpand={expandHandler}
          selectedPanel={expanded}>
          <EditableLayout
            panel={panel}
            isEdit={isEdit}
            onEdit={editHandler}>
            <EditableSelect
              isEdit={isEdit}
              label='Referrer email*'
              placeholder='Select Referrer email'
              options={userOptions}
              value={recommend.referrer.email}
              onChange={onReferrerSelectHandler()}
            />
            <EditableInput
              isEdit={false}
              label='First Name'
              value={recommend.referrer.firstName}
            />
            <EditableInput
              isEdit={false}
              label='Last Name'
              value={recommend.referrer.lastName}
            />
            <EditableInput
              isEdit={false}
              label='LinkedIn'
              value={recommend.referrer.linkedInURL}
            />
            <EditableInput
              isEdit={isEdit}
              label='Candidate email*'
              value={recommend.candidate.email}
              onChange={onCandidateChangeHandler('email')}
            />
            <EditableInput
              isEdit={isEdit}
              label='First Name*'
              value={recommend.candidate.firstName}
              onChange={onCandidateChangeHandler('firstName')}
            />
            <EditableInput
              isEdit={isEdit}
              label='Last Name*'
              value={recommend.candidate.lastName}
              onChange={onCandidateChangeHandler('lastName')}
            />
            <EditableInput
              isEdit={false}
              label='LinkedIn'
              value={recommend.candidate.linkedInURL}
            />
            <EditableSelect
              isEdit={isEdit}
              label='Expertise area*'
              placeholder='Select expertise area'
              options={expertiseOptions}
              value={recommend.expertiseArea}
              onChange={onFieldChangeHandler('expertiseArea')}
            />
            <EditableLimitMultiSelect
              isEdit={isEdit}
              label='Expertise area detail'
              placeholder='Select expertise area detail'
              options={subExpertiseOptions}
              value={recommend.subExpertises}
              onChange={onFieldChangeHandler('subExpertises')}
            />
            <EditableLimitMultiSelect
              isEdit={isEdit}
              label='Skills'
              placeholder='Select skills'
              options={skillOptions}
              value={recommend.skills}
              onChange={onFieldChangeHandler('skills')}
            />
            <EditableLimitMultiSelect
              isEdit={isEdit}
              label='Strengths'
              placeholder='Select strengths'
              options={strengthOptions}
              value={recommend.strengths}
              onChange={onFieldChangeHandler('strengths')}
            />
            <EditableSelect
              isEdit={isEdit}
              label='Relationship'
              placeholder='Select relationship'
              options={relationshipOptions}
              value={recommend.whichCapacity}
              onChange={onFieldChangeHandler('whichCapacity')}
            />
            <EditableTextarea
              isEdit={isEdit}
              label='Relationship detail'
              value={recommend.howYouKnow}
              onChange={onFieldChangeHandler('howYouKnow')}
            />
            <EditableTextarea
              rows={4}
              isEdit={isEdit}
              label='Why great'
              value={recommend.whyGreat}
              onChange={onFieldChangeHandler('whyGreat')}
            />
            <EditableTextarea
              rows={4}
              isEdit={isEdit}
              label='Accomplishment'
              value={recommend.accomplishment}
              onChange={onFieldChangeHandler('accomplishment')}
            />
          </EditableLayout>
        </AccordionLayout>
        {
          showDialog &&
          <ConfirmDialog
            opened={showDialog}
            onClose={closeDialogHandler}
            onConfirm={deleteHandler} />
        }
      </main>
    );
  } else {
    return (
      <NotFound />
    );
  }
};

AdminEditRecommend.defaultProps = {
  panel: 'recommendPanel'
};

export default withStyles(styles)(AdminEditRecommend);
