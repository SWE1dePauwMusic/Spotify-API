// const request = require('request');
//
//
// function getArtistWithId(accessToken, artistId) {
//     const options = {
//         url: 'https://api.spotify.com/v1/artists/' + artistId,
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         }
//     };
//
//     request.get(options, function (error, response, body) {
//         if (!error) {
//             var data = JSON.parse(body);
//             console.log(data);
//         } else {
//             console.error('Error:', error);
//             console.error('Response:', response && response.statusCode);
//         }
//     });
// }
//
// //Get device from Spotify API
// function getDevice(accessToken) {
//     console.log("inside getDevice")
//     const options = {
//         url: 'https://api.spotify.com/v1/me/player/devices',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         }
//     };
//
//     request.get(options, function (error, response, body) {
//
//         // if (!error) {
//         //     var data = JSON.parse(body);
//         //     var targetDeviceId = data.devices[1].id;
//         //
//         // } else {
//         //     console.error('Error:', error);
//         //     console.error('Response:', response && response.statusCode);
//         // }//
//
//         //use try catch instead
//         try {
//             var data = JSON.parse(body);
//             console.log(data);
//
//             var targetDeviceId = data.devices[1].id;
//
//             return targetDeviceId;
//         } catch (error) {
//             console.error('Error:', error);
//             console.error('Response:', response && response.statusCode);
//             return null;
//          }
//
//     });
// }
//
// function switchDevice(accessToken){
//     let deviceId = getDevice(accessToken);
//     const switchPlaybackOptions = {
//         url: 'https://api.spotify.com/v1/me/player',
//         headers: {
//             'Authorization': 'Bearer ' + access_token,
//             'Content-Type': 'application/json'
//         },
//         json: true,
//         body: {
//             device_ids: [deviceId],  // Replace with actual device ID
//             play: true
//         }
//     };
//     request.put(switchPlaybackOptions, function(err, resp, body) {
//         if (!err && resp.statusCode === 204) {
//             console.log("Playback switched successfully");
//         } else {
//             console.error("Error switching playback:", err, body);
//
//         }
//     });
// }
//
//
//
//
// module.exports = {getDevice, switchDevice}
//
//
//
//
// //