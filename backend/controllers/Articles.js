import { z } from "zod";
import upload from "../middleware/multerConfig.js";
import Articles from "../models/ArticlesModel.js";

const articleSchema = z.object({
  title: z.string().min(1, { message: "Silakan isi judul artikel." }),
  category: z.string().min(1, { message: "Silakan isi kategori artikel." }),
  image: z.string().min(1, { message: "Silakan unggah gambar artikel." }),
  content: z.string().min(1, { message: "Silakan isi konten artikel." }),
});

export const createArticles = async (req, res) => {
  const { name } = req.user;

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
          name,
          title: parsedData.title,
          category: parsedData.category,
          image: req.file.filename,
          content: parsedData.content,
        };

        const result = await Articles.create(data);
        res.status(201).json({
          message: "Article created successfully",
          data: result,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors = error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          }));
          return res.status(400).json({ errors: formattedErrors });
        }
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const { name } = req.user;

  try {
    // Proses upload gambar
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const id = req.params.id;

      // Cari artikel berdasarkan ID
      const existingArticle = await Articles.findByPk(id);

      // Validasi: Artikel tidak ditemukan atau tidak dimiliki oleh user
      if (!existingArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      if (existingArticle.name !== name) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Data yang diperbarui
      const data = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.file ? req.file.filename : existingArticle.image, // Gunakan gambar baru jika ada
      };

      try {
        // Validasi data menggunakan Zod
        articleSchema.parse(data);

        // Update artikel
        await Articles.update(data, { where: { id } });
        res.status(200).json({ message: "Article updated successfully" });
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Format error validasi
          const formattedErrors = error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          }));
          return res.status(400).json({ errors: formattedErrors });
        }
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticles = async (req, res) => {
  const { name } = req.user;

  try {
    const id = req.params.id;
    const article = await Articles.findByPk(id);

    if (!article || article.name !== name) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Articles.destroy({ where: { id } });
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll({
      attributes: { exclude: ["userId", "tags"] },
    });

    res.status(200).json({
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllArticlesById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Articles.findOne({
      where: { id },
      attributes: { exclude: ["userId", "tags"] },
    });

    if (!article) {
      return res
        .status(404)
        .json({ message: "Article not found or not published" });
    }

    res.status(200).json({
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error retrieving published article:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserArticleById = async (req, res) => {
  const { name } = req.user;

  try {
    const id = req.params.id;
    const article = await Articles.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.name !== name) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserArticles = async (req, res) => {
  const { name } = req.user;
  try {
    const articles = await Articles.findAll({
      where: { name },
    });
    console.log("Articles found:", articles);

    if (articles.length === 0) {
      return res.status(404).json({
        message: `No articles found for user: ${name}`,
      });
    }

    res.status(200).json({
      message: `Articles retrieved successfully for user: ${name}`,
      data: articles,
    });
  } catch (error) {
    console.error("Error fetching articles by user:", error);
    res.status(500).json({ error: error.message });
  }
};
