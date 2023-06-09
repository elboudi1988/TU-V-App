const jwt = require("jsonwebtoken");

exports.isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden: Only admins can perform this action" });
  }
  next();
};
exports.auth = (req, res, next) => {
  const token =
    req.cookies.Authorization || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    req.userId = decoded.id;
    req.companyName = decoded.companyName;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};
/*exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    req.userId = decoded.id;
    req.companyName = decoded.companyName;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};*/
