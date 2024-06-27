const {getDevice, switchDevice} = require("../Services/deviceServices");
const {json} = require("express");


const getDeviceHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("received token: ",  accessToken)
        console.log("start getting deviceId")
        const deviceId = await getDevice(accessToken);


        res.json({ deviceId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const switchDeviceHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const deviceName = req.body.deviceName;
        console.log("device Name request: ", deviceName);
        console.log("start switching device");
        const message = await switchDevice(accessToken, deviceName);
        res.status(200).json({ message: message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDeviceHandler,
    switchDeviceHandler
};
