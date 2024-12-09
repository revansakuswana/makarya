import Users from "../models/UserModel.js";
import Jobs from "../models/JobsModel.js";
import jwt from "jsonwebtoken";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getJobsById = async (req, res) => {
  const id = req.params.id;

  try {
    const jobs = await Jobs.findByPk(id);
    if (!jobs) {
      return res.status(404).json({ msg: "Data pekerjaan tidak ditemukan" });
    }
    res.status(200).json({
      msg: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

// export const postsavedJobs = async (req, res) => {
//   const jobsId = req.params.id;
//   const jwt_token = req.cookies.jwt;
//   if (!jwt_token) return res.sendStatus(403);

//   try {
//     const decode = jwt.decode(jwt_token);
//     const { userId } = decode;

//     const jobs = await Jobs.findByPk(jobsId);
//     if (!jobs) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     const alreadySaved = await SavedJobs.findOne({
//       where: {
//         job_id: jobs.id,
//         user_id: userId,
//       },
//     });

//     if (alreadySaved) {
//       return res.status(400).json({ message: "Job already saved" });
//     }

//     await SavedJobs.create({
//       id: jobs.id,
//       job_title: jobs.job_title,
//       company: jobs.company,
//       location: jobs.location,
//       work_type: jobs.work_type,
//       working_type: jobs.working_type,
//       experience: jobs.experience,
//       study_requirement: jobs.study_requirement,
//       salary: jobs.salary,
//       link: jobs.link,
//       link_img: jobs.link_img,
//       skills: jobs.skills,
//       updatedAt: jobs.updatedAt,
//     });

//     res.status(200).json({ message: "Job saved successfully" });
//   } catch (error) {
//     console.error("Error saving job:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deletesavedJobs = async (req, res) => {
//   const jwt_token = req.cookies.jwt;
//   if (!jwt_token) return res.status(403).json({ msg: "Token is required" });

//   let userId;
//   try {
//     const decode = jwt.decode(jwt_token);
//     userId = decode.userId;
//   } catch (error) {
//     return res.status(403).json({ msg: "Invalid or expired token" });
//   }

//   const { jobId } = req.params;
//   if (!jobId) return res.status(400).json({ msg: "Job ID is required" });

//   try {
//     db.query(
//       "DELETE FROM saved_jobs WHERE user_id = ? AND job_id = ?",
//       [userId, jobId],
//       (err) => {
//         if (err) {
//           console.error("Error deleting job:", err);
//           return res.status(500).json({ msg: "Error deleting job" });
//         }
//         res.status(200).json({ msg: "Job deleted from saved jobs!" });
//       }
//     );
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

// export const getsavedJobs = async (req, res) => {
//   const jwt_token = req.cookies.jwt;
//   if (!jwt_token) return res.status(403).json({ msg: "Token is required" });

//   let userId;
//   try {
//     const decode = jwt.decode(jwt_token);
//     userId = decode.userId;
//   } catch (error) {
//     return res.status(403).json({ msg: "Invalid or expired token" });
//   }

//   try {
//     db.query(
//       `SELECT jobs.id, jobs.job_title, jobs.company, jobs.location, jobs.salary, jobs.link
//        FROM saved_jobs
//        JOIN jobs ON saved_jobs.job_id = jobs.id
//        WHERE saved_jobs.user_id = ?`,
//       [userId],
//       (err, results) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ msg: "Error fetching saved jobs", error: err.message });
//         }
//         if (results.length === 0) {
//           return res
//             .status(404)
//             .json({ msg: "No saved jobs found for this user" });
//         }
//         res
//           .status(200)
//           .json({ msg: "Saved Jobs retrieved successfully", data: results });
//       }
//     );
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "Internal server error", error: error.message });
//   }
// };


// export const assignJobToUser = async (req, res) => {
//   const jobId = req.body.jobId;
//   console.log(req.cookies);

//   const jwt_token = req.cookies.jwt;
//   if (!jwt_token) return res.status(403).json({ message: "gagal login" });

//   try {
//     const decode = jwt.decode(jwt_token);
//     const { userId, name, email } = decode;

//     const user = await Users.findByPk(userId);
//     const job = await Jobs.findByPk(jobId);

//     if (user && job) {
//       await user.addUserSavedJobs(job, { through: { status: "saved" } });
//       res.json({
//         message: `Job ${job.job_title} assigned to user ${user.name}`,
//       });
//     } else {
//       res.status(404).json({ message: "User or Job not found." });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
