import Users from "../models/UserModel.js";
import Jobs from "../models/JobsModel.js";
import jwt from "jsonwebtoken";

export const assignJobToUser = async (req, res) => {
  const jobId = req.body.jobId;
  console.log(req.cookies);

  const jwt_token = req.cookies.jwt;
  if (!jwt_token) return res.status(403).json({ message: "gagal login" });

  try {
    const decode = jwt.decode(jwt_token);
    const { userId, name, email } = decode;

    const user = await Users.findByPk(userId);
    const job = await Jobs.findByPk(jobId);

    if (user && job) {
      await user.addUserSavedJobs(job, { through: { status: "saved" } });
      res.json({
        message: `Job ${job.job_title} assigned to user ${user.name}`,
      });
    } else {
      res.status(404).json({ message: "User or Job not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
