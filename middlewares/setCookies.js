const setCookies = async (token, res) => {
    // setting http-only cookies
    const expiryDate = 60 * 60 * 1000;
    // Set the cookie with a more secure SameSite attribute (consider 'none' for HTTPS)
    await res.cookie('userAuth', token, {
        httpOnly: true,
        secure: true, // Change to true for HTTPS
        maxAge: expiryDate,
        sameSite: "none" // 'none' for HTTPS with proper security measures
    });
}

module.exports = setCookies;