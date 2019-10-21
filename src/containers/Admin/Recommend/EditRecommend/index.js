
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import * as RECOMMEND_SERVICE from '../../../../services/recommend';
import {
  setRecommends,
  removeRecommend,
  addEditRecommend,
  setExpertises,
  setRelationships
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
  EditableMultiSelect,
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
  const expertises = useSelector(state => state.expertise.data, []);
  const relationships = useSelector(state => state.relationship.data, []);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(panel);
  const [editPanel, setEditPanel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [recommend, setRecommend] = useState({});
  const [expertiseOptions, setExpertiseOptions] = useState([]);
  const [subExpertiseOptions, setSubExpertiseOptions] = useState([]);
  const [relationshipOptions, setRelationshipOptions] = useState([]);

  useEffect(() => {
    dispatch(setRecommends());
    dispatch(setExpertises());
    dispatch(setRelationships());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const recommendId = match.params.recommendId;
    const selectedRecommend = recommends.find(recommend => recommend._id === recommendId);
    setRecommend(selectedRecommend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommends]);

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
    if (!isEmpty(recommend) && !isEmpty(expertises)) {
      const { subExpertises } = expertises.find(expertise => expertise.name === recommend.expertiseArea);
      const subExpertisesData = subExpertises.map((name) => ({ label: name, value: name }));
      setSubExpertiseOptions(subExpertisesData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommend, expertises]);

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

  const saveHandler = async () => {
    if (!recommend.expertiseArea
      || !recommend.whichCapacity
      || !recommend.whyGreat
      || !recommend.howYouKnow) {
      showErrorToast(notifications.FORM_VALODATION_ERROR);
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
    const isEdit = panel === editPanel;
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
            <EditableInput
              isEdit={false}
              label='Referrer email'
              value={recommend.referrer.email}
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
              label='Candidate email'
              value={recommend.candidate.email}
            />
            <EditableInput
              isEdit={false}
              label='First Name'
              value={recommend.candidate.firstName}
            />
            <EditableInput
              isEdit={false}
              label='Last Name'
              value={recommend.candidate.lastName}
            />
            <EditableSelect
              isEdit={isEdit}
              label='Expertise area'
              placeholder='Select expertise area'
              options={expertiseOptions}
              value={recommend.expertiseArea}
              onChange={onFieldChangeHandler('expertiseArea')}
            />
            <EditableMultiSelect
              isEdit={isEdit}
              label='Expertise area detail'
              placeholder='Select expertise area detail'
              options={subExpertiseOptions}
              value={recommend.subExpertises}
              onChange={onFieldChangeHandler('subExpertises')}
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
