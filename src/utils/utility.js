// TODO: replace all hardcoded theme.spacing.unit with this
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { toast } from 'react-toastify';
import { roles } from '../constants/roles';

const getFontUnit = theme => theme.spacing.unit * 1.25;

const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const hasValidToken = () => {
  if (!localStorage.jwtToken) {
    return false;
  }

  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return false;
  }
  return true;
};

const validateRoleAccess = (pageRoles, loggedInUser) => {
  let valid = false;
  if (pageRoles.includes(loggedInUser.role)) {
    valid = true;
  }
  return valid;
};

const getMomentTime = (date, timeFormat = 'MM/DD/YYYY') => {
  return moment(date).format(timeFormat);
};

const getAPIToken = () => {
  try {
    const decoded = jwt_decode(localStorage.jwtToken);
    return decoded.apiToken;
  } catch (error) {
    console.log('great dolphin : [utils utility getAPIToken] error => ', error);
    return '';
  }
};

const compareObject = (object1, object2) => {
  if (JSON.stringify(object1) !== JSON.stringify(object2)) {
    return false;
  }
  return true;
};

// remove item with index and return the rest as array
const removeItemWithSlice = (items, index) => {
  return [...items.slice(0, index), ...items.slice(index + 1)]
};

const getCurrentEmployment = (employments) => {
  if (isEmpty(employments)) {
    return {
      companyName: '',
      title: ''
    }
  }

  const currentEmployment = employments.find((employment) => (employment.currentlyWorks));
  if (!isEmpty(currentEmployment)) {
    return currentEmployment;
  } else {
    return employments[0];
  }
}

const showErrorToast = message => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

const showInfoToast = message => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

const getDiffYearsAndMonths = (startYear, startMonth, endYear, endMonth, currentlyWorks) => {
  startYear = parseInt(startYear || 0, 10);
  startMonth = getMonth(startMonth);
  endYear = currentlyWorks ? (new Date().getFullYear()) : parseInt(endYear || 0, 10);
  endMonth = currentlyWorks ? (new Date().getMonth() + 1) : getMonth(endMonth);

  const diffAllMonths = (endYear - startYear) * 12 + endMonth - startMonth;
  const diffYear = Math.floor(diffAllMonths / 12);
  const diffMonth = diffAllMonths % 12;

  let duration = '';
  switch (diffYear) {
    case 0:
      break
    case 1:
      duration = `${diffYear} year `;
      break
    default:
      duration = `${diffYear} years `;
      break
  }

  switch (diffMonth) {
    case 0:
      break
    case 1:
      duration += `${diffMonth} month`;
      break
    default:
      duration += `${diffMonth} months`;
      break
  }

  return duration;
}

const getTotalYears = (employmentHistories) => {
  let totalYears = 0;

  for (const history of employmentHistories) {
    let { startYear, startMonth, endYear, endMonth, currentlyWorks } = history;

    startYear = parseInt(startYear, 10);
    startMonth = getMonth(startMonth);
    endYear = currentlyWorks ? (new Date().getFullYear()) : parseInt(endYear, 10);
    endMonth = currentlyWorks ? (new Date().getMonth() + 1) : getMonth(endMonth);
    totalYears += (endYear - startYear) * 12 + endMonth - startMonth;
  }

  return Math.floor(totalYears / 12);
}

const getDuration = (startYear, startMonth, endYear, endMonth, currentlyWorks) => {
  if (isEmpty(startMonth) && isEmpty(startYear)) {
    return ''
  }

  if ((isEmpty(endMonth) && isEmpty(endYear)) && !currentlyWorks) {
    return ''
  }

  const startDate = `${startMonth} ${startYear}`;
  const endDate = currentlyWorks ? 'present' : `${endMonth} ${endYear}`;
  return `${startDate} - ${endDate}`;
}

const getMonth = (monthStr) => {
  return new Date(monthStr + '-1-01').getMonth() + 1
}

const getYears = () => {
  const now = new Date();
  return [...Array(100)].map((e, index) => ({
    label: now.getFullYear() - index,
    value: now.getFullYear() - index
  }));
}

const addEditArray = (items, data) => {
  const targetIndex = items.findIndex(item => (
    item._id === data._id
  ));

  if (targetIndex >= 0) {
    items[targetIndex] = data;
  } else {
    items = [
      data,
      ...items
    ];
  }
  return items;
}

const removeArray = (items, id) => {
  const targetIndex = items.findIndex(item => (
    item._id === id
  ));

  return removeItemWithSlice(items, targetIndex);
}

const getGroupRole = (value) => {
  switch (value) {
    case roles.GROUP_DISCOVER_ROLE:
      return 'Standard Group'
    case roles.GROUP_CASH_ROLE:
      return 'Cash Group'
    default:
      break
  }
}

const getUserRole = (value) => {
  switch (value) {
    case roles.ADMIN_ROLE:
      return 'Admin'
    case roles.REFERRER_ROLE:
      return 'Standard User'
    case roles.WEAK_ROLE:
      return 'Weak User'
    default:
      break
  }
}

const getAvatarWithName = (firstName, lastName) => {
  return 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/' +
    firstName.charAt(0).toUpperCase() + '+' + lastName.charAt(0).toUpperCase() + '/128';
}

export {
  isEmpty,
  hasValidToken,
  validateRoleAccess,
  getFontUnit,
  getMomentTime,
  getAPIToken,
  compareObject,
  removeItemWithSlice,
  getCurrentEmployment,
  showErrorToast,
  showInfoToast,
  getDiffYearsAndMonths,
  getMonth,
  getTotalYears,
  getDuration,
  getYears,
  addEditArray,
  removeArray,
  getGroupRole,
  getUserRole,
  getAvatarWithName
};
