// if user gmail does not contain "@gmail.com" in the login or register page
// error status will be send
const gmailCheck = (req, res, next) => {
	if (req.body.email.endsWith("@gmail.com")) {
		next();
	} else {
		res.sendStatus(403);
	}
};

module.exports = gmailCheck;
