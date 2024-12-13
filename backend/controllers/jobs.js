import Users from "../models/UserModel.js";
import Jobs from "../models/JobsModel.js";
import UserSavedJobs from "../models/UserSavedJobsModel.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findAll();
    res.status(200).json(jobs);
  } catch (error) {
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
      msg: "Data pekerjaan berhasil dimuat",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const saveJob = async (req, res) => {
  const jobsId = req.body.id;
  const { userId } = req.user;

  if (!userId) {
    return res.status(403).json({ msg: "Pengguna tidak ditemukan" });
  }

  try {
    const user = await Users.findByPk(userId);
    const job = await Jobs.findByPk(jobsId);

    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    if (!job) {
      console.log("Jobs ID:", job);
      return res.status(404).json({ msg: "Lowongan tidak ditemukan" });
    }

    const isAlreadySaved = await UserSavedJobs.findOne({
      where: { users_id: userId, jobs_id: jobsId },
    });

    if (isAlreadySaved) {
      return res
        .status(400)
        .json({ msg: "Lowongan sudah disimpan sebelumnya" });
    }

    await UserSavedJobs.create({ users_id: userId, jobs_id: jobsId });

    res.json({
      msg: `Lowongan berhasil disimpan`,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteSavedJob = async (req, res) => {
  const jobsId = req.body.id;
  const { userId } = req.user;

  if (!userId) {
    return res.status(403).json({ msg: "Pengguna tidak ditemukan" });
  }

  try {
    const user = await Users.findByPk(userId);
    const job = await Jobs.findByPk(jobsId);

    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    if (!job) {
      return res.status(404).json({ msg: "Lowongan tidak ditemukan" });
    }

    const result = await UserSavedJobs.destroy({
      where: { users_id: userId, jobs_id: jobsId },
    });

    if (result === 0) {
      return res
        .status(404)
        .json({ msg: "Lowongan tidak ditemukan dalam daftar simpanan" });
    }

    res.json({
      msg: `Lowongan berhasil dihapus`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getSavedJobs = async (req, res) => {
  const { userId } = req.user;

  if (!userId) return res.status(403).json({ msg: "Pengguna tidak ditemukan" });

  try {
    const user = await Users.findByPk(userId, {
      include: {
        model: Jobs,
        as: "savedJobs",
        through: {
          attributes: [],
        },
      },
    });

    if (user) {
      res.json({
        msg: "Pekerjaan yang disimpan berhasil dimuat",
        data: user.savedJobs,
      });
    } else {
      res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
