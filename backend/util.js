import jwt from "jsonwebtoken";
import config from "./config";
const getToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h"
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token, length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "invalind token" });
      }
      req.user = token;
      next();
      return;
    });
  }
  return res.status(401).send({ msg: "token is not supplied" });
};

const isAdmin = () => {
  if (req.user && req.user.isAdmin) {
    return next(); // accept the token
  }
  return res.status(401).send({ msg: "Admin token not valid" });
};
export { getToken, isAdmin, isAuth };
