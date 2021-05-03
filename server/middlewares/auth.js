const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.header("authToken");

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({ code: 401, message: "Session expired" });

      req.user = decoded.data;
    });
  }

  next();
};

module.exports = { isAuth };
