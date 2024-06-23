const {getDevice, switchDevice} = require("../Services/deviceServices");


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
        console.log("received token: ", accessToken);
        console.log("start switching device");
        const message = await switchDevice(accessToken);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getDeviceHandler,
    switchDeviceHandler
};
