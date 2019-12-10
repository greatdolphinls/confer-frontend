
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import { AdminTabs } from '../../Shared';
import { SendContactModal } from '../Shared';
import { setContacts, removeContact } from '../../../../actions';
import * as CONTACT_SERVICE from '../../../../services/contact';
import {
  CustomMUIDataTable,
  SendIconButton,
  RemoveIconButton,
  ConfirmDialog
} from '../../../../components';
import notifications from '../../../../constants/notifications';
import { commonMUITableOptions } from '../../../../utils/styles';
import { showInfoToast, showErrorToast, getMomentTime, isEmpty } from '../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(4)}px 0`
    },
    paper: {
      margin: `${theme.spacing(2)}px 0`
    },
    actions: {
      display: 'flex'
    },
    addButton: {
      color: theme.palette.subButtonColor,
      backgroundColor: theme.palette.subBackColor4,
      boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)`,
    }
  };
};

const AdminContactList = ({ classes, tab, history }) => {
  const contacts = useSelector(state => state.contact.data, []);
  const dispatch = useDispatch();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [sendDialog, setSendDialog] = useState(false);
  const [contactId, setContactId] = useState();
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    dispatch(setContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTableData = useMemo(() =>
    contacts.map(contact => {
      const { sender, candidate, message, _id, createdAt } = contact;
      const row = [
        `${sender.firstName} ${sender.lastName}`,
        `${candidate.firstName} ${candidate.lastName}`,
        `${message}`,
        getMomentTime(createdAt),
        _id
      ];
      return row;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [contacts]);

  const columns = useMemo(() =>[
    { name: 'Sender' },
    { name: 'Candidate' },
    { name: 'Message' },
    { name: 'Date' },
    {
      name: 'Action',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={classes.actions}>
              <SendIconButton
                onClick={modalHandler('send', true, value)} />
              <RemoveIconButton
                onClick={modalHandler('delete', true, value)} />
            </div>
          );
        }
      }
    }
  ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  const options = useMemo(() =>
    ({
      ...commonMUITableOptions
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [contacts]);

  const modalHandler = (modal, show, contactId = null) => () => {
    setContactId(contactId);
    if (!isEmpty(contactId)) {
      const selectedValue = contacts.find(({ _id }) => (contactId === _id));
      setSelectedContact(selectedValue);
    }

    switch (modal) {
      case 'send':
        setSendDialog(show);
        break;
      case 'delete':
        setDeleteDialog(show);
        break;
      default:
        break
    }
  }

  const deleteConfirmHandler = async () => {
    try {
      const { data } = await CONTACT_SERVICE.removeContact(contactId);
      dispatch(removeContact(data));
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setContactId(null);
    setSelectedContact({});
    setDeleteDialog(false);
  }

  const sendConfirmHandler = async (contact) => {
    try {
      const { data } = await CONTACT_SERVICE.sendContactRequest(contact);
      dispatch(removeContact(data));
      showInfoToast(notifications.SUCCESS_SEND_CONTACT_REQUEST)
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      }
    }
    setContactId(null);
    setSendDialog(false);
    setSelectedContact({});
  };

  return (
    <main className={classes.root}>
      <AdminTabs selectedValue={tab} history={history} />
      <Paper className={classes.paper}>
        <CustomMUIDataTable
          data={createTableData}
          columns={columns}
          options={options} />
      </Paper>
      {
        deleteDialog &&
        <ConfirmDialog
          opened={deleteDialog}
          onClose={modalHandler('delete', false)}
          onConfirm={deleteConfirmHandler} />
      }
      {
        sendDialog &&
        <SendContactModal
          contact={selectedContact}
          opened={sendDialog}
          onClose={modalHandler('send', false)}
          onConfirm={sendConfirmHandler} />
      }
    </main>
  );
};

AdminContactList.propTypes = {
  classes: PropTypes.object.isRequired
};

AdminContactList.defaultProps = {
  tab: 'contacts'
};

export default withStyles(styles)(AdminContactList);
