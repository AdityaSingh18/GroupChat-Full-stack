const jwt = require('jsonwebtoken')
const User = require('../models/user');

exports.authentication = (req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token)
    const user = jwt.verify(token , process.env.JWT_SECRET)
    User.findByPk(user.userId).then(foundUser=>{
        req.user = foundUser ;
        next();
    })
}