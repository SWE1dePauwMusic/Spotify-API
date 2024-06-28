const {getDevice, switchDevice} = require("../Services/deviceServices");
const {json} = require("express");
const makeResponse = require("../Utils/response");


const getDeviceHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];        //Should we need to check whether you have token or not??
        console.log("received token: ",  accessToken)
        console.log("start getting deviceId")
        const deviceId = await getDevice(accessToken);

        makeResponse(res, 200, { deviceId: deviceId })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const switchDeviceHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const deviceName = req.body.deviceName;
        console.log("device Name request: ", deviceName);
        console.log("start switching device");
        const message = await switchDevice(accessToken, deviceName);
        makeResponse(res, 200, { message: message });
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

module.exports = {
    getDeviceHandler,
    switchDeviceHandler
};
