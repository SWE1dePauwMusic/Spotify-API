
const axios = require('axios');
const CustomError = require("./errorHandling");
// const CustomError = require('./CustomError'); // Adjust the path to where your CustomError module is located

async function makeRequest(options) {
    const { method, url, headers, data } = options;

    try {
        const response = await axios({
            method,
            url,
            headers,
            data
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code outside of the range of 2xx
            throw new CustomError(error.response.status, error.response.data.error.message || error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            throw new CustomError(500, 'No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new CustomError(500, error.message);
        }
    }
}

module.exports = makeRequest;
