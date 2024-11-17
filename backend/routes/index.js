import {
  logout,
  SignUp,
  SignIn,
  getProfile,
  updateProfile,
  deleteProfile,
  verifyEmail,
  sendVerificationEmail,
  forgotPassword,
  resetPassword,
  getJobs,
  getJobsById,
  postsavedJobs,
  deletesavedJobs,
  getsavedJobs,
} from "../controllers/Users.js";
import {
  createArticles,
  deleteArticles,
  getArticles,
  getArticleById,
  updateArticle,
} from "../controllers/Articles.js";
import { authenticateUser } from "../middleware/VerifyToken.js";
import { assignJobToUser, } from "../controllers/jobAssignment.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import express from "express";

const router = express.Router();

router.get("/test", getProfile, (req, res) => {
  // Mengakses data pengguna yang sudah disimpan di req.user
  const user = req.user;
  res.json({ message: "Data pengguna", user });
});
// Rute untuk pengguna
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/profile", deleteProfile);
router.post("/users/signup", SignUp);
router.post("/users/signin", SignIn);
router.delete("/users/logout", logout);

router.post("/verify-email", sendVerificationEmail);
router.get("/verify-email/:token", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Rute untuk saved jobs
router.post("/assign-job", authenticateUser, assignJobToUser);

// router.post("/savedjobs", postsavedJobs);
// router.delete("/savedjobs", deletesavedJobs);
// router.get("/savedjobs", getsavedJobs);

// Rute untuk token refresh
router.get("/token", refreshToken);

// Rute untuk pekerjaan
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobsById);

// Rute untuk artikel
router.get("/articles", getArticles);
router.get("/articleslist/:id", getArticleById);
router.post("/articles/articlesform", createArticles);
router.put("/articleslist/:id/", updateArticle);
router.delete("/articles/:id", deleteArticles);

export default router;
