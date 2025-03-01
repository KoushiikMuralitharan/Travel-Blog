const express = require("express");
const {
  addBlog,
  myBlogs,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} = require("../Controller/blogController");
const { upload, authenticateToken } = require("../Middleware/auth");
const router = express.Router();

router.post("/add-blog/:id", authenticateToken, upload.single('image'), addBlog);
router.get("/get-myblogs/:id", authenticateToken, myBlogs);
router.get("/getting-blog/:id", authenticateToken, getSingleBlog);
router.patch("/update-blog/:id", authenticateToken, upload.single('image'), updateBlog);
router.delete("/delete-blog/:id", authenticateToken, deleteBlog);
router.get("/all-blogs", authenticateToken, getAllBlogs);

module.exports = router;
