const models = require('../models');
const User = models.User;

checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
      	return res.status(400).json({ 
            status: "error", 
            message: "failed! Email already exist"
        });
      }

      next();
    });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;