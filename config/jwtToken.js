var jwt = require('jsonwebtoken');
require('dotenv').config();
exports.getToken = (id) => {
    const token = jwt.sign(
        { _id: id },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    return token;
}
exports.decodeToken = (req, res) => {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        if (bearer.length > 0) {
            const bearerToken = bearer[1];
            return jwt.verify(bearerToken, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
                return decoded;
            });
        } else {
            return res.status(400).send({ auth: false, message: 'No token provided.' });
        }
    } else {
        return res.status(400).send({ auth: false, message: 'No token provided.' });
    }
}