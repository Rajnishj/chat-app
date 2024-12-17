import jwt from 'jsonwebtoken'

const getnerateJWTtokenAndSetCookies = async(userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "15d"
    })

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,//max age of token 15days after that it will expire
        httpOnly: true, //prevent XSS attacks i.e cross-site scripting attacks,
        sameSite: "strict" ,//prevent CSRF attacks cross-site request forgery attacks ,
        secure: process.env.NODE_DEV !== "development"
    })
}

export default getnerateJWTtokenAndSetCookies