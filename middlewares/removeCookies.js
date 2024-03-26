const removeCookies = async (req, res, next) => {
    // Clear the cookie by setting its expiration date to a past time
    await res.cookie('userAuth', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: true, // Change to true for HTTPS
        sameSite: 'lax' // 'none' for HTTPS with proper security measures
    });
    next();
}

module.exports = removeCookies;