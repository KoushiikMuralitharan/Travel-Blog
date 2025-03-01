const express = require("express");
const {
  DeleteUser,
  updateUserRole,
  getAllUsers,
} = require("../Controller/adminController");
const { checkAdmin, authenticateToken } = require("../Middleware/auth");
const router = express.Router();

router.delete("/delete-user/:id", checkAdmin, authenticateToken, DeleteUser);
router.get("/all-users", checkAdmin, authenticateToken, getAllUsers);
router.patch(
  "/update-userrole/:id",
  checkAdmin,
  authenticateToken,
  updateUserRole
);

module.exports = router
