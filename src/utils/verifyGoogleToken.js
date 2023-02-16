const { OAuth2Client } = require('google-auth-library')

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID)
/**
 * @description Verify the provided Google token credential using the Google OAuth2 client.
 * @param token token The Google token credential to verify
 * @returns An object containing the verified payload data, or an error message if the token is invalid

 */
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