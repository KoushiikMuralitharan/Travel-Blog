const jwt = require("jsonwebtoken");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();

const accessKey = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cloudinary-files",
    format: async (req, file) => "png",
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage: storage });

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken) {
      jwt.verify(accessToken, accessKey, (error) => {
        if (error) {
          console.log(error);
          res.status(403).json({
            status: "failure",
            message: "access denied",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        status: "failure",
        message: "access token not found",
      });
    }
  } catch (error) {
    res.status(500).json({});
  }
}

function checkAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(accessToken, accessKey);
    if (decodedToken.role === "admin") {
      next();
    } else {
      res.status(403).json({
        status: "failure",
        message: "You have no rights to do this function",
      });
    }
  } catch (error) {
    res.status(500).json({});
  }
}

module.exports = { upload, authenticateToken, checkAdmin };
