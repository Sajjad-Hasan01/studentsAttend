exports.logoutRoute = async (req, res) => {
    return res.clearCookie("access-token").send("Success");
};