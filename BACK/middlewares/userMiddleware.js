const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.headers['header-token'];
    if (!token) {
      console.log("Token not provided");
      return res.status(401).send({error : "Token not provided"});
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err) {
            console.log("Invalid Token");
            return res.status(403).send({error : "Invalid Token"});
        }
        req.user = decoded;
        console.log("Token is good !");
        next();
    }
    );
}