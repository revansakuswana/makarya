import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
import upload from "../middleware/multerConfig.js";
import Jobs from "../models/JobsModel.js";
import SavedJobs from "../models/JobsModel.js";
import nodemailer from "nodemailer";
import { Op } from "sequelize";

export const getProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await Users.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "name",
        "email",
        "location",
        "education",
        "skills",
        "image",
        "isVerified",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      return res.status(404).json({
        msg: `Pengguna dengan nama "${userId}" tidak ditemukand`,
      });
    }

    res.status(200).json({
      msg: `Profil berhasil diambil untuk pengguna: ${userId}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat memperbarui profil",
    });
  }
};

export const updateProfile = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { userId } = req.user; 
    try {
      const existingUser = await Users.findOne({ where: { id: userId } });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const data = {
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        education: req.body.education,
        skills: req.body.skills,
        image: req.file ? req.file.filename : existingUser.image, // Gunakan gambar baru jika ada
      };

      const result = await Users.update(data, { where: { id: userId } });

      if (result[0] === 0) {
        return res.status(404).json({ msg: "Gagal memperbarui profil" });
      }

      res.status(200).json({
        msg: "Profil berhasil diperbarui",
        data: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Terjadi kesalahan saat memperbarui profil" });
    }
  });
};

export const deleteProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const existingUser = await Users.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    await Users.destroy({ where: { id: userId } });

    res.status(200).json({ msg: "Akun berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat menghapus akun" });
  }
};

export const SignUp = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak sama" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({
        msg: "Email sudah terdaftar, Silakan masuk atau gunakan email lain",
      });
    }

    const salt = await bcrypt.genSalt();
    const verificationToken = await bcrypt.hash(email + Date.now(), salt);
    const verificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    await Users.create({
      name,
      email,
      password: hashPassword,
      location: "",
      education: "",
      skills: "",
      image: "",
      isVerified: false,
      verificationToken,
      verificationExpires,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `http://localhost:5173/verify-email/${encodeURIComponent(
      verificationToken
    )}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifikasi Email Makarya Anda",
      html: `<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="font-family: Arial, sans-serif; padding: 50px;">
            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; margin: auto;">
              <!-- Header -->
              <tr>
                <td style="width: 100%; height: 4px; background-color: #0370DF;"></td>
              </tr>
              <tr>
                <td align="center" bgcolor="#FFFFFF">
                  <img src="https://i.ibb.co.com/C9v3Gc7/Group-6.png" alt="Makarya Logo" width="120" style="display: block; padding: 20px 0px 20px 0px;" />
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 0px 25px; color: #333333; font-size: 16px; line-height: 1.5;">
                  <p>Hai, ${name}</p>
                  <p>Terima kasih telah membuat akun di Makarya.</p>
                  <p>Untuk memastikan email Anda resmi dan terverifikasi, silakan klik link biru "Verifikasi Email" di bawah ini:</p>
                  <p style="text-align: center;">
                    <a href="${verificationUrl}" style="background-color: #0370DF; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; font-size: 16px;">Verifikasi Email</a>
                  </p>
                  <p>Setelah klik "Verifikasi Email", Anda akan dibawa ke platform Web Makarya, dan Anda sudah bisa mulai pencarian loker.</p>
                  <p>Salam hormat,<br/>Tim Makarya</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #666666; font-size: 12px;">
                  <p>Email ini ditujukan kepada ${email}</p>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Responsive styles -->
          <style>
            @media only screen and (max-width: 600px) {
              table {
                width: 100% !important;
              }
              div {
              padding: 10px !important;
              } 
              td {
                padding: 1px 20px !important;
                font-size: 14px !important;
              }
              img {
                width: 120px !important;
              }
            }
          </style>
        </body>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ msg: "Error sending verification email" });
      }
      res.status(200).json({
        msg: "Register berhasil. Verifikasi email Anda untuk mengaktifkan akun.",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error saat register" });
  }
};

export const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    const salt = await bcrypt.genSalt();
    const verificationToken = await bcrypt.hash(email + Date.now(), salt);
    const verificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.update({
      verificationToken,
      verificationExpires,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `http://localhost:5173/verify-email/${encodeURIComponent(
      verificationToken
    )}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifikasi Email Makarya Anda",
      html: `
        <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="font-family: Arial, sans-serif; padding: 50px;">
            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; margin: auto;">
              <tr>
                <td style="width: 100%; height: 4px; background-color: #0370DF;"></td>
              </tr>
              <tr>
                <td align="center" bgcolor="#FFFFFF">
                  <img src="https://i.ibb.co.com/C9v3Gc7/Group-6.png" alt="Makarya Logo" width="120" style="display: block; padding: 20px 0px 20px 0px;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 0px 25px; color: #333333; font-size: 16px; line-height: 1.5;">
                  <p>Hai, ${user.name}</p>
                  <p>Terima kasih telah membuat akun di Makarya.</p>
                  <p>Untuk memastikan email Anda resmi dan terverifikasi, silakan klik link biru "Verifikasi Email" di bawah ini:</p>
                  <p style="text-align: center;">
                    <a href="${verificationUrl}" style="background-color: #0370DF; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; font-size: 16px;">Verifikasi Email</a>
                  </p>
                  <p>Setelah klik "Verifikasi Email", Anda akan dibawa ke platform Web Makarya, dan Anda sudah bisa mulai pencarian loker.</p>
                  <p>Salam hormat,<br/>Tim Makarya</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #666666; font-size: 12px;">
                  <p>Email ini ditujukan kepada ${email}</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- Responsive styles -->
          <style>
            @media only screen and (max-width: 600px) {
              table {
                width: 100% !important;
              }
              div {
              padding: 10px !important;
              } 
              td {
                padding: 1px 20px !important;
                font-size: 14px !important;
              }
              img {
                width: 120px !important;
              }
            }
          </style>
        </body>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ msg: "Error sending verification email" });
      }
      res.status(200).json({ msg: "Email verifikasi telah dikirim" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error saat mengirim email verifikasi" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await Users.findOne({ where: { verificationToken: token } });

    if (user.verificationExpires < Date.now()) {
      return res.status(400).json({ msg: "Waktu verifikasi sudah kadaluarsa" });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).json({ msg: "Email berhasil diverifikasi" });

    user.verificationToken = null;
    user.verificationExpires = null;
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Pengguna sudah melakukan verifikasi" });
  }
};

export const SignIn = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "Email tidak ditemukan. Periksa alamat email Anda.",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Kata sandi salah. Silakan coba lagi" });
    }

    const userId = user.id;
    const name = user.name;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", accessToken, {
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "Sign In berhasil, Selamat Datang kembali!",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat login, Silakan coba lagi nanti" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  res.clearCookie("refreshToken");
  res.clearCookie("jwt");

  console.log("Cookie cleared");

  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  return res.sendStatus(200);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        msg: "Email tidak ditemukan. Periksa alamat email Anda.",
      });
    }

    // Generate token and hash it with bcrypt
    const token = (Math.random() + 1).toString(36).substring(2);
    const hashedToken = await bcrypt.hash(token, 10);
    const expires = new Date(Date.now() + 3600000).toISOString(); // Convert to ISO string

    // Update user model with token and expiration
    await user.update({
      reset_password_token: hashedToken,
      reset_password_expires: expires,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5173/reset-password/${encodeURIComponent(
      token
    )}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Lupa Kata Sandi",
      html: `
        <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="font-family: Arial, sans-serif; padding: 50px;">
            <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin: auto;">
              <!-- Header -->
              <tr style="display: flex; flex-direction: column; align-items: center;">
                <td style="width: 100%; height: 4px; background-color: #0370DF;"></td>
                <td align="center" bgcolor="#FFFFFF">
                  <img src="https://i.ibb.co.com/C9v3Gc7/Group-6.png" alt="Makarya Logo" width="120" style="display: block; padding: 20px 0px 20px 0px;" />
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 0px 25px; color: #333333; font-size: 16px; line-height: 1.5;">
                  <p>Hai</p>
                  <p>Ini info yang kamu minta untuk membantumu mengakses akun Makarya-mu.</p>
                  <p>Tapi cepat! Tautan ini akan kedaluwarsa dalam 24 jam...</p>
                  <p>Email penggunamu: ${email}</p>
                  <p style="text-align: center;">
                    <a href="${resetUrl}" style="background-color: #0370DF; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; font-size: 16px;">Reset kata sandimu</a>
                  </p>
                  <p>Tidak meminta info ini?</p>
                  <p>Jangan khawatir, kamu bisa mengabaikan email ini. Informasimu aman bersama kami.</p>
                  <p>Salam hormat,<br/>Tim Makarya</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #666666; font-size: 12px;">
                  <p>Email ini ditujukan kepada ${email}</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- Responsive styles -->
          <style>
            @media only screen and (max-width: 600px) {
              table {
                width: 100% !important;
              }
              div {
              padding: 10px !important;
              } 
              td {
                padding: 1px 20px !important;
                font-size: 14px !important;
              }
              img {
                width: 120px !important;
              }
            }
          </style>
        </body>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ msg: "Terjadi kesalahan saat mengirim email" });
      }
      res.status(200).json({
        msg: "Email pengaturan ulang kata sandi berhasil dikirim",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Kesalahan server" });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const resetToken = req.params.token;

  try {
    const user = await Users.findOne({
      where: {
        reset_password_expires: { [Op.gt]: new Date().toISOString() },
      },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Link tidak valid atau telah kedaluwarsa",
      });
    }

    const tokenIsValid = await bcrypt.compare(
      resetToken,
      user.reset_password_token
    );
    if (!tokenIsValid) {
      return res.status(400).json({
        msg: "Verifikasi token gagal. Pastikan Anda menggunakan tautan pengaturan ulang yang benar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({
      password: hashedPassword,
      reset_password_token: null,
      reset_password_expires: null,
    });

    res
      .status(200)
      .json({ msg: "Kata sandi Anda telah berhasil diatur ulang" });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan server yang tidak terduga. Silakan coba lagi nanti",
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jobs data" });
  }
};

export const getJobsById = async (req, res) => {
  const id = req.params.id;

  try {
    const jobs = await Jobs.findByPk(id);
    if (!jobs) {
      return res.status(404).json({ message: "Jobs not found" });
    }
    res.status(200).json({
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postsavedJobs = async (req, res) => {
  const jobsId = req.params.id;
  const jwt_token = req.cookies.jwt;
  if (!jwt_token) return res.sendStatus(403);

  try {
    const decode = jwt.decode(jwt_token);
    const { userId } = decode;

    const jobs = await Jobs.findByPk(jobsId);
    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadySaved = await SavedJobs.findOne({
      where: {
        job_id: jobs.id,
        user_id: userId,
      },
    });

    if (alreadySaved) {
      return res.status(400).json({ message: "Job already saved" });
    }

    await SavedJobs.create({
      id: jobs.id,
      job_title: jobs.job_title,
      company: jobs.company,
      location: jobs.location,
      work_type: jobs.work_type,
      working_type: jobs.working_type,
      experience: jobs.experience,
      study_requirement: jobs.study_requirement,
      salary: jobs.salary,
      link: jobs.link,
      link_img: jobs.link_img,
      skills: jobs.skills,
      updatedAt: jobs.updatedAt,
    });

    res.status(200).json({ message: "Job saved successfully" });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deletesavedJobs = async (req, res) => {
  const jwt_token = req.cookies.jwt;
  if (!jwt_token) return res.status(403).json({ msg: "Token is required" });

  let userId;
  try {
    const decode = jwt.decode(jwt_token);
    userId = decode.userId;
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }

  const { jobId } = req.params;
  if (!jobId) return res.status(400).json({ msg: "Job ID is required" });

  try {
    db.query(
      "DELETE FROM saved_jobs WHERE user_id = ? AND job_id = ?",
      [userId, jobId],
      (err) => {
        if (err) {
          console.error("Error deleting job:", err);
          return res.status(500).json({ msg: "Error deleting job" });
        }
        res.status(200).json({ msg: "Job deleted from saved jobs!" });
      }
    );
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getsavedJobs = async (req, res) => {
  const jwt_token = req.cookies.jwt;
  if (!jwt_token) return res.status(403).json({ msg: "Token is required" });

  let userId;
  try {
    const decode = jwt.decode(jwt_token);
    userId = decode.userId;
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }

  try {
    db.query(
      `SELECT jobs.id, jobs.job_title, jobs.company, jobs.location, jobs.salary, jobs.link
       FROM saved_jobs 
       JOIN jobs ON saved_jobs.job_id = jobs.id 
       WHERE saved_jobs.user_id = ?`,
      [userId],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Error fetching saved jobs", error: err.message });
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ msg: "No saved jobs found for this user" });
        }
        res
          .status(200)
          .json({ msg: "Saved Jobs retrieved successfully", data: results });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
