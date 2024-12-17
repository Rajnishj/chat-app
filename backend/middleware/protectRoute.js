import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            res.status(401).json({
                err: "Unauthorised - Invalid token"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            res.status(401).json({
                err: "Unauthorised - Invalid token"
            })
        }
        const user = await User.findById(decode.userId).select('-password')
        if(!user){
            res.status(404).json({
                err:"User not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            error: error.message,
            err: "Internal Server Error."
        })
    }
}

export default protectRoute