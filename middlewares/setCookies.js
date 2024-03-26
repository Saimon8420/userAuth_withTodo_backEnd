require("dotenv").config();
const setCookies = async (token, res) => {
    // setting http-only cookies
    const expiryDate = 60 * 60 * 1000;
    // Set the cookie with a more secure SameSite attribute (consider 'none' for HTTPS)
    await res.cookie('userAuth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Change to true for HTTPS
        maxAge: expiryDate,
        sameSite: "lax" // 'none' for HTTPS with proper security measures
    });
}

module.exports = setCookies;