const jwt = require("jsonwebtoken")
const usersCltr = {}

usersCltr.login = (req, res) => {
    const body = req.body;
    if (body.email == process.env.EMAIL && body.password == process.env.PASSWORD) {
        // res.json({
        //     notice: "successfully logged in"
        // })
        const token = jwt.sign({id: process.env.ID},process.env.JWT_SECRET,{expiresIn : "14d"})
        res.json({token : token})
        // generate a jwt (jsonwebtoken) token and send the token to the frontend
    } else {
        res.status(401).json({
            notice: "Invalid Credential"
        })
    }
}

module.exports = usersCltr;