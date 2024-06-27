
//Get device from Spotify API
const request = require('request')

function getDevice(accessToken, deviceName) {
    const options = {
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };
    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            try {
                const data = JSON.parse(body);
                console.log(data);
                if (data.devices && data.devices.length > 0) {
                    for (let i = 0; i < data.devices.length; i++) {
                        if (data.devices[i].name === deviceName) {
                            resolve(data.devices[i].id);
                        }
                    }
                    }
                reject(new Error('No devices: ' + deviceName + 'found'))
            }
            catch (error) {
                reject(error);
            }
        });
    });
}


async function switchDevice(accessToken, deviceName) {
    try {
        // Wait for the device ID to be returned
        let deviceId = await getDevice(accessToken, deviceName);
        console.log("Device ID:", deviceId);

        // Define options for switching playback
        const switchPlaybackOptions = {
            url: 'https://api.spotify.com/v1/me/player',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                device_ids: [deviceId],  // Replace with actual device ID
                play: true
            }
        };

        // Make the request to switch playback
        return new Promise((resolve, reject) => {               //Send request
            request.put(switchPlaybackOptions, function(err, resp, body) {
                if (!err && resp.statusCode === 204) {
                    console.log("Playback switched successfully");
                    resolve('Playback switched successfully');
                } else {
                    console.error("Error switching playback:", err, body);
                    reject(new Error("Error switching playback: " + (body.error.message || body)));
                }
            });
        });


    } catch (error) {
        console.error("Error getting device ID:", error);
        return Promise.reject("no device " +  error);
    }
}

module.exports = {switchDevice, getDevice}