
const makeResponse = require("../Utils/response");
const {getAuthUrl, getAccessToken, getRefreshAccessToken} = require("../Services/authService");

let accessToken = '';
let refreshToken = '';
let expiresIn = 0;
const login = (req, res) => {
    const spotifyOAUTHUrl = getAuthUrl();
    res.redirect(spotifyOAUTHUrl);          //redirect to Spotify authURL
};

const callback = async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).send('Authorization code is required');
        }

        const data = await getAccessToken(code);

        accessToken = data.access_token;
        refreshToken = data.refresh_token;
        expiresIn = data.expires_in;
        res.redirect('/')
        // makeResponse(res, 200, { access_token: accessToken });
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getToken = (req, res) => {
    console.log("AccessToken", accessToken);
    console.log("RefreshToken", refreshToken);
    const authTokenData = {
        access_token: accessToken,
        refresh_token: refreshToken,
        expiresIn: expiresIn,
    }
    makeResponse(res, 200, {authTokenData});
};

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;

        if (!refreshToken) {
            return makeResponse(res, 400, null, 'Refresh token is required');
        }

        const data = await getRefreshAccessToken(refreshToken);
        const newAccessToken = data.access_token;
        accessToken = newAccessToken;
        console.log('newAccessToken', newAccessToken)
        makeResponse(res, 200, { access_token: newAccessToken });
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

module.exports = {
    login,
    callback,
    getToken,
    refreshAccessToken,
};
