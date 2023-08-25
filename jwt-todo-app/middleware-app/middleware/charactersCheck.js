// users todo cannot exceed 140 characters else error status will be send
const charactersCheck = (req, res, next) => {
	if (req.body.todos.length <= 140) {
		next();
	} else {
		res.sendStatus(413);
	}
};

module.exports = charactersCheck;
