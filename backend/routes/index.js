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
  getSession,
} from "../controllers/Users.js";
import {
  getJobs,
  getJobsById,
  // postsavedJobs,
  // deletesavedJobs,
  // getsavedJobs,
} from "../controllers/jobs.js";
import {
  createArticles,
  deleteArticles,
  getAllArticles,
  getAllArticlesById,
  getUserArticles,
  getUserArticleById,
  updateArticle,
} from "../controllers/Articles.js";
import { verifyToken } from "../middleware/VerifyToken.js";
// import { assignJobToUser } from "../controllers/jobAssignment.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import express from "express";

const router = express.Router();

// router.get("/test", getProfile, (req, res) => {
//   // Mengakses data pengguna yang sudah disimpan di req.user
//   const user = req.user;
//   res.json({ message: "Data pengguna", user });
// });

// Rute untuk profile
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.delete("/profile", verifyToken, deleteProfile);

// Rute untuk auth
router.post("/users/signup", SignUp);
router.post("/users/signin", SignIn);
router.delete("/users/logout", logout);
router.get("/session", getSession);
router.post("/verify-email", sendVerificationEmail);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Rute untuk saved jobs
// router.post("/assign-job", verifyToken, assignJobToUser);
// router.post("/savedjobs", postsavedJobs);
// router.delete("/savedjobs", deletesavedJobs);
// router.get("/savedjobs", getsavedJobs);

// Rute untuk token refresh
router.get("/token", refreshToken);

// Rute untuk pekerjaan
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobsById);

// Rute untuk artikel
router.get("/allarticles", getAllArticles);
router.get("/allarticles/:id", getAllArticlesById);
router.get("/user/articles", verifyToken, getUserArticles);
router.get("/articleslist/:id", verifyToken, getUserArticleById);
router.post("/articles/articlesform", verifyToken, createArticles);
router.put("/articleslist/:id", verifyToken, updateArticle);
router.delete("/articles/:id", verifyToken, deleteArticles);

export default router;
