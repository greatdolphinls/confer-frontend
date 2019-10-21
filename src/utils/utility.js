// TODO: replace all hardcoded theme.spacing.unit with this
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { toast } from 'react-toastify';

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

const getMomentTime = (date, timeFormat) => {
  return moment.utc(date).format(timeFormat);
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

const dateTimeToUTCString = dateTime => {
  const dateString = moment(dateTime).format('YYYY.MM.DD HH:mm:ss');
  return dateString + ' UTC';
};

// remove item with index and return the rest as array
const removeItemWithSlice = (items, index) => {
  return [...items.slice(0, index), ...items.slice(index + 1)]
};

const getCurrentEmployment = (employments) => {
  const currentEmployment = employments.find((employment) => (employment.currentlyWorks));
  if (!!currentEmployment) {
    return currentEmployment;
  } else {
    return employments[employments.length - 1];
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
  startYear = parseInt(startYear, 10);
  startMonth = getMonth(startMonth);
  endYear = currentlyWorks ? (new Date().getFullYear()) : parseInt(endYear, 10);
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

const addEditArray= (items, data) => {
  const targetIndex = items.findIndex(item => (
    item._id === data._id
  ));

  if (targetIndex >= 0) {
    items[targetIndex] = data;
  } else {
      items = [
          ...items,
          data
      ];
  }
  return items;
}

const removeArray= (items, id) => {
  const targetIndex = items.findIndex(item => (
    item._id === id
  ));
  
  return removeItemWithSlice(items, targetIndex);
}

export {
  isEmpty,
  hasValidToken,
  validateRoleAccess,
  getFontUnit,
  getMomentTime,
  getAPIToken,
  compareObject,
  dateTimeToUTCString,
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
  removeArray
};
