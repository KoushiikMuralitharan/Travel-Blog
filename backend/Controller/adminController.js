const User = require("../Modals/userModel");
const Blog = require("../Modals/BlogModel");

const DeleteUser = async (req, res) => {
  try {
    await Blog.deleteMany({ userID: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: `user cannot be deleted. ${error}`,
    });
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({ role: { $ne: "admin" } }).sort({
    createdAt: -1,
  });
  res.json(allUsers);
};

const updateUserRole = async (req, res) => {
  try {
    const updateUserRoleResult = await User.updateOne(
      { _id: req.params.id },
      { role: "admin" }
    );
    res.status(200).json({
      status: "Success",
      message: "role changed successfully.",
      role: updateUserRoleResult,
    });
  } catch (error) {
    res.status(200).json({
      status: "Success",
      message: `role cannot be updated ${error}`,
    });
  }
};

module.exports = { DeleteUser, getAllUsers, updateUserRole };
