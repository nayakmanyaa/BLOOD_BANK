const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).send({
                    success: false,
                    message:"Auth Failed"
                })
            } else {
                req.body.userId = decode.userId;
                next();
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            error,
            message: "Auth Failed"
        })
    }
};



module.exports = authMiddleware

// if middleware is exported a {  } then it will act as object and we want to export it as function
// module.exports = { authMiddleware };
