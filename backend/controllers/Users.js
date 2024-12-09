import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import upload from "../middleware/multerConfig.js";
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
        "avatar",
        "is_verified",
        "created_at",
        "updated_at",
      ],
    });

    if (!user) {
      return res.status(404).json({
        msg: `Pengguna tidak ditemukan`,
      });
    }

    res.status(200).json({
      msg: `Profil berhasil dimuat`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const updateProfile = async (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }

    const { userId } = req.user;
    try {
      const existingUser = await Users.findOne({ where: { id: userId } });
      if (!existingUser) {
        return res.status(404).json({ msg: `Pengguna tidak ditemukan` });
      }

      const data = {
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        education: req.body.education,
        skills: req.body.skills,
        avatar: req.file ? req.file.filename : existingUser.avatar,
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
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
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
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
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
    const verification_token = await bcrypt.hash(email + Date.now(), salt);
    const verification_expires = Date.now() + 24 * 60 * 60 * 1000;

    await Users.create({
      name,
      email,
      password: hashPassword,
      location: "",
      education: "",
      skills: "",
      avatar: "",
      is_verified: false,
      verification_token,
      verification_expires,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `https://makarya.my.id/verify-email/${encodeURIComponent(
      verification_token
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
          .json({ msg: "Terjadi kesalahan saat mengirim email verifikasi" });
      }
      res.status(200).json({
        msg: "Register berhasil, Verifikasi email Anda untuk mengaktifkan akun",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
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
        msg: "Email tidak ditemukan, Periksa alamat email Anda",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Kata sandi salah, Silakan coba lagi" });
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
      httpOnly: true,
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
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "Selamat Datang kembali!",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getSession = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isLoggedIn: false });
    }
    return res.status(200).json({ isLoggedIn: true, user: decoded });
  });
};

export const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    const salt = await bcrypt.genSalt();
    const verification_token = await bcrypt.hash(email + Date.now(), salt);
    const verification_expires = Date.now() + 24 * 60 * 60 * 1000;

    await user.update({
      verification_token,
      verification_expires,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `https://makarya.my.id/verify-email/${encodeURIComponent(
      verification_token
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
          .json({ msg: "Terjadi kesalahan saat mengirim email verifikasi" });
      }
      res.status(200).json({ msg: "Email verifikasi telah dikirim" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await Users.findOne({ where: { verification_token: token } });

    if (user.verification_expires < Date.now()) {
      return res.status(400).json({ msg: "Waktu verifikasi sudah kadaluarsa" });
    }

    user.is_verified = true;
    await user.save();

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ msg: "Email berhasil diverifikasi" });

    user.verification_token = null;
    user.verification_expires = null;
    await user.save();
  } catch (error) {
    res.status(500).json({ msg: "Pengguna sudah melakukan verifikasi" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  res.clearCookie("refreshToken");
  res.clearCookie("jwt");

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
        msg: "Email tidak ditemukan, Periksa alamat email Anda",
      });
    }

    const token = (Math.random() + 1).toString(36).substring(2);
    const hashedToken = await bcrypt.hash(token, 10);
    const expires = new Date(Date.now() + 3600000).toISOString();

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

    const resetUrl = `https://makarya.my.id/reset-password/${encodeURIComponent(
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
          .json({ msg: "Terjadi kesalahan saat mengirim email verifikasi" });
      }
      res.status(200).json({
        msg: "Email pengaturan ulang kata sandi berhasil dikirim",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
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
        msg: "Verifikasi token gagal, Pastikan Anda menggunakan tautan pengaturan ulang yang benar",
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
      msg: "Terjadi kesalahan pada server",
    });
  }
};