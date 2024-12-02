import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user.',
      error: error.message,
    });
  }
}