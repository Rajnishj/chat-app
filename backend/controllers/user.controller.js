import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const findAllUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
    if (!findAllUsers) {
      res.status(200).json({ data: [] });
    }else{
      res.status(200).json({
        data: findAllUsers,
      });
    }
    
  } catch (error) {
    res.status(500).json({
      err: "Internal Server Error.",
      error: error.message,
    });
  }
};
