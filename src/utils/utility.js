// TODO: replace all hardcoded theme.spacing.unit with this
import jwt_decode from 'jwt-decode';
import moment from 'moment';

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

export {
    isEmpty,
    hasValidToken,
    getFontUnit,
    getMomentTime,
    getAPIToken,
    compareObject,
    dateTimeToUTCString,
    removeItemWithSlice,
    getCurrentEmployment
};
