const jwt = require("jsonwebtoken");

// to verify if the user is valid or not
function verify(req, res, next) {
  const authHeader = req.headers.token;
  // header token will be: bearer <authTOKEN here>
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
