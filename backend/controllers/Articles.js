import upload from "../middleware/multerConfig.js";
import models from "../models/index.js";
import path from "path";
import { z } from "zod";

const { Articles, Users } = models;

const articleSchema = z.object({
  title: z.string().min(1, { msg: "Silakan isi judul artikel." }),
  category: z.string().min(1, { msg: "Silakan isi kategori artikel." }),
  image: z.string().min(1, { msg: "Silakan unggah gambar artikel." }),
  content: z.string().min(1, { message: "Silakan isi konten artikel." }),
});

export const createArticles = async (req, res) => {
  const { name, userId } = req.user;

  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        const parsedData = articleSchema.parse({
          title: req.body.title,
          category: req.body.category,
          image: req.file ? req.file.filename : null,
          content: req.body.content,
        });

        const data = {
          author_id: userId,
          name,
          title: parsedData.title,
          category: parsedData.category,
          image: req.file.filename,
          content: parsedData.content,
        };

        const result = await Articles.create(data);
        res.status(201).json({
          msg: "Artikel berhasil diposting",
          data: result,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors = error.errors.map((e) => ({
            field: e.path[0],
            msg: e.msg,
          }));
          return res.status(400).json({ errors: formattedErrors });
        }
        res.status(500).json({ error: "Gagal memposting artikel" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updateArticle = async (req, res) => {
  const { name } = req.user;

  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const id = req.params.id;

      const existingArticle = await Articles.findByPk(id);

      if (!existingArticle) {
        return res.status(404).json({ msg: "Artikel tidak ditemukan" });
      }

      if (existingArticle.name !== name) {
        return res.status(403).json({ msg: "Akses ditolak" });
      }

      const data = {
        title: req.body.title,
        category: req.body.category,
        image: req.file ? req.file.filename : existingArticle.image,
        content: req.body.content,
      };

      try {
        articleSchema.parse(data);

        await Articles.update(data, { where: { id } });
        res.status(200).json({ msg: "Artikel berhasil diperbarui" });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors = error.errors.map((e) => ({
            field: e.path[0],
            msg: e.message,
          }));
          return res.status(400).json({ errors: formattedErrors });
        }
        res.status(500).json({ msg: "Gagal memperbarui artikel" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteArticles = async (req, res) => {
  const { name } = req.user;

  try {
    const id = req.params.id;
    const article = await Articles.findByPk(id);

    if (!article || article.name !== name) {
      return res.status(403).json({ msg: "Akses ditolak" });
    }

    await Articles.destroy({ where: { id } });
    res.status(200).json({ msg: "Artikel berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll({
      include: [
        {
          model: Users,
          as: "author",
          attributes: ["name", "avatar"],
        },
      ],
    });

    if (!articles) {
      return res.status(404).json({ msg: "Artikel tidak ditemukan" });
    }

    res.status(200).json({
      msg: "Artikel berhasil dimuat",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data" });
  }
};

export const getAllArticlesById = async (req, res) => {
  try {
    const { id } = req.params;

    const articles = await Articles.findOne({
      where: { id },
      include: [
        {
          model: Users,
          as: "author",
          attributes: ["name", "avatar"],
        },
      ],
    });

    if (!articles) {
      return res.status(404).json({ msg: "Artikel tidak ditemukan" });
    }

    res.status(200).json({
      msg: "Artikel berhasil dimuat",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data" });
  }
};

export const getUserArticleById = async (req, res) => {
  const { name } = req.user;

  try {
    const id = req.params.id;
    const article = await Articles.findByPk(id);

    if (!article) {
      return res.status(404).json({ msg: "Artikel tidak ditemukan" });
    }

    if (article.name !== name) {
      return res.status(403).json({ msg: "Akses ditolak" });
    }

    res.status(200).json({
      msg: "Artikel berhasil dimuat",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data" });
  }
};

export const getUserArticles = async (req, res) => {
  const { name } = req.user;
  try {
    const articles = await Articles.findAll({
      where: { name },
    });

    if (articles.length === 0) {
      return res.status(404).json({
        msg: `Tidak ada artikel yang ditemukan`,
      });
    }

    res.status(200).json({
      msg: `Artikel berhasil dimuat`,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data" });
  }
};
