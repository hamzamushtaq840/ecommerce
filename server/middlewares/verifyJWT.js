import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1]; //Bearer token at 1 position
        try {
            jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err)
                    return res.sendStatus(403) //invalid token you are forbidden for this token
                req.user = decoded.userId
                next();
            })
        } catch (error) {
            return res.status(401).json({ error: "Unauthorized" });
        }
    }
    else { return res.status(401).json({ error: "Unauthorized" }); }
}

export default verifyToken