import axios from "axios";

// TODO: could make it as promise instead of callback
const fetchData = (url, fetchSuccessCallback, fetchErrorCallback) => {
    // TODO: could do this in service worker
    const headers = new Headers({
        "Content-Type": "application/json",
        // TODO: store jwt token to redux state and rehydrate
        Authorization: localStorage.jwtToken
    });

    const init = {
        method: "GET",
        headers: headers
    };

    fetch(url, init)
        // we get the API response and receive data in JSON format...
        .then(response => response.clone().json())
        // ...then we update the users state
        .then(data => fetchSuccessCallback(data))
        // catch any errors we hit and update the app
        .catch(
            fetchErrorCallback
                ? fetchErrorCallback
                : error => {
                    console.log(
                        "great dolphin : [utils api fetchData error catch] error => ",
                        error
                    );
                }
        );
};

const fetchDataWithAxios = async url => {
    return await axios.get(url);
};

const removeDataWithAxios = async url => {
    return await axios.delete(url);
};

const postDataWithAxios = async (url, data) => {
    return await axios.post(url, data);
};

const updateDataWithAxios = async (url, data) => {
    // data._id is required
    return await axios.put(url, data);
};

export {
    fetchData,
    fetchDataWithAxios,
    removeDataWithAxios,
    postDataWithAxios,
    updateDataWithAxios
};
