const User = require("../model/User");
const { verifyGoogleTokenCred } = require("../utils/verifyGoogleToken");
const jwt = require("jsonwebtoken");
const { authService } = require("./authService");
const Auth = require("../model/Auth");
/**
 *  Verify the Google token credentials
 *  Get user profile from the verification response
 *  If the user doesn't exist, create a new user
 *  Create a new auth for the user
 *  Return the user data and access token
 */
const googleAuth = {
    googleAuthService: async function (credentials) {
        try {
            const verificationResponse = await verifyGoogleTokenCred(credentials);
            if (verificationResponse.error) {
                return { message: verificationResponse.error };
            }

            const profile = verificationResponse?.payload;
            console.log("profile--- :>> ", profile);

            const userData = await User.findOne({ email: profile?.email });

            if (!userData) {
                newUserData = new User({
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    email: profile?.email,
                    userName: profile?.sub,
                });
                const res = await newUserData.save();
                console.log("res :>> ", res);
                if (res) {
                    const authRes = await authService.authCreate(res, profile.jti);
                    return {
                        err: 0,
                        _id: res._id,
                        email: res.email,
                        token: jwt.sign(
                            {
                                _id: res._id,
                                authId: authRes._id,
                                name: `${res.firstName} ${res.lastName}`,
                            },
                            process.env.SECRET_KEY,
                            { expiresIn: "30days" }
                        ),
                    };
                }
            }
            if (userData) {
                const authData = await Auth.findOne({ email: profile?.email });
                return {
                    err: 0,
                    _id: userData._id,
                    email: userData.email,
                    token: jwt.sign(
                        {
                            _id: userData._id,
                            authId: authData._id,
                            name: `${userData.firstName} ${userData.lastName}`,
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: "30days" }
                    ),
                };
            }
        } catch (error) {
            return { err: 1, message: "An error occurred. Registration failed." };
        }
    },
};

module.exports = googleAuth;
