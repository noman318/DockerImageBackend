const { OAuth2Client } = require('google-auth-library')

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const verifyGoogleTokenCred = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    }
    catch (error) { return { error: "Invalid user detected. Please try again" }; }
}

module.exports = { verifyGoogleTokenCred }