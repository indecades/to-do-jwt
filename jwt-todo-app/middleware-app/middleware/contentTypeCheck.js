// if content type does not contain "Content-type": "application/json"
// error status will be send
const contentType = (req, res, next) => {
	if (req.get("Content-Type") === "application/json") {
		next();
	} else {
		res.sendStatus(415);
	}
};

module.exports = contentType;
