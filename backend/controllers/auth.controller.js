import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import getnerateJWTtokenAndSetCookies from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword)
      res.status(400).json({
        err: "Password don't match please check",
      });
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({
        err: "User already exist",
      });
    }
    //Hash your password
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password,salt)

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const otherProfilePic = "https://avatar.iran.liara.run/public/boy";

    const newUser = new User({
      fullName,
      password: hashPassword,
      username,
      gender,
      profilePicture:
        gender === "male"
          ? maleProfilePic
          : gender === "female"
          ? femaleProfilePic
          : otherProfilePic,
    });
    if (newUser) {
      await newUser.save();
      getnerateJWTtokenAndSetCookies(newUser._id,res)
      const responseUser = {
        id:newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
        gender: newUser.gender,
      };
      res.status(201).json({
        message: "User added Successfully.",
        user: responseUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      err: "Invalid User",
      error: error.message,
    });
  }
};

export const login = async(req, res) => {
  try {
   const { password , username } = req.body
   
   const user = await User.findOne({username})
   const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "")
   if(!user || !isPasswordCorrect){
    res.status(400).json({
      err:"username or password doesn't match"
    })
   }
   await getnerateJWTtokenAndSetCookies(user._id,res)
   const responseUser = await User.findOne({username}).select('-password') // to exclude the user from response we use .select method that remove password from response
   res.status(200).json({
    message:"User logged in successfully",
    user: responseUser
   })
  } catch (error) {
   res.status(500).json({
    err: " Error while login",
    error: error.message
   }) 
  }
};

export const logout =async(req, res) => {
 try {
  res.cookie("jwt","",{maxAge: 0}),
  res.status(200).json({
    message: "User has been logged out successfully"
  })
 } catch (error) {
  res.status(500).json({
    err: "Error while logout",
    error: error.message
  })
 }
};
