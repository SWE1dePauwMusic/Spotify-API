const makeRequest = require("../Utils/request");
const CustomError = require("../Utils/errorHandling");


async function getDevice(accessToken, deviceName) {
    const options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    try {
        const data = await makeRequest(options);
        console.log("Device of new ", data.devices)
        if (data && data.devices && data.devices.length > 0) {
            for (let i = 0; i < data.devices.length; i++) {
                if (data.devices[i].name === deviceName) {
                    return data.devices[i].id;
                }
            }
        }
        throw new CustomError(404, 'No devices: ' + deviceName + ' found');
    } catch (error) {
        throw new CustomError(500, error.message || 'Error fetching devices');
    }
}

async function switchDevice(accessToken, deviceName) {
    try {
        // Wait for the device ID to be returned
        let deviceId = await getDevice(accessToken, deviceName);
        console.log("Device ID:", deviceId);

        // Define options for switching playback
        const switchPlaybackOptions = {
            method: 'PUT',
            url: 'https://api.spotify.com/v1/me/player',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            data: {
                device_ids: [deviceId],  // Replace with actual device ID
                play: true
            }
        };

        // Make the request to switch playback
        await makeRequest(switchPlaybackOptions);
        console.log("Playback switched successfully");
        return { deviceId: deviceId };
    } catch (error) {
        console.error("Error switching playback:", error);
        throw new CustomError(500, 'Error switching playback: ' + error.message);
    }
}

module.exports = { switchDevice, getDevice };
