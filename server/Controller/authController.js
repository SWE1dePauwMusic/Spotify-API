
const makeResponse = require("../Utils/response");
const {getAuthUrl, getAccessToken, getRefreshAccessToken} = require("../Services/authService");

let accessToken = '';
let refreshToken = '';
let expiresIn = 0;

const login = (req, res) => {
    console.log("OAUTH2 through Spotify")
    const spotifyOAUTHUrl = getAuthUrl();
    res.redirect(spotifyOAUTHUrl);          //redirect to Spotify authURL
};

const callback = async (req, res) => {
    console.log("Callback from Minh's app starts ...")
    try {

        const code = req.query.code;

        if (!code) {
            return res.status(400).send('Authorization code is required');
        }

        const data = await getAccessToken(code);
        console.log(data)

        accessToken = data.access_token;
        refreshToken = data.refresh_token;
        expiresIn = data.expires_in;
        res.redirect('/main')
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

        const authTokenData = {
            access_token :data.access_token,
            expiresIn: data.expires_in,
        };
        accessToken = authTokenData.access_token;
        console.log('newAccessToken', authTokenData)
        makeResponse(res, 200, {authTokenData});
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
