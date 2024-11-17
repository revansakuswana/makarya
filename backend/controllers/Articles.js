import { z } from "zod";
import upload from "../middleware/multerConfig.js";
import Articles from "../models/ArticlesModel.js";
import jwt from "jsonwebtoken";

const articleSchema = z.object({
  title: z.string().min(1, { message: "Silakan isi judul artikel." }),
  category: z.string().min(1, { message: "Silakan isi kategori artikel." }),
  image: z.string().min(1, { message: "Silakan unggah gambar artikel." }),
  content: z.string().min(1, { message: "Silakan isi konten artikel." }),
});

export const createArticles = async (req, res) => {
  const jwt_token = req.cookies.jwt;
  if (!jwt_token) return res.sendStatus(403);

  try {
    const decode = jwt.decode(jwt_token);
    const { userId, name, email } = decode;

    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Validate input data
      try {
        const parsedData = articleSchema.parse({
          title: req.body.title,
          category: req.body.category,
          image: req.file ? req.file.filename : null, // Save the file name
          content: req.body.content,
        });

        // Jika validasi sukses, lanjutkan proses penyimpanan data
        const data = {
          name: name,
          title: parsedData.title, // Gunakan parsed data
          category: parsedData.category,
          image: req.file.filename,
          content: parsedData.content,
        };

        try {
          const result = await Articles.create(data);
          res.status(201).json({
            message: "Article created successfully",
            data: result,
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      } catch (error) {
        // Return error messages if validation fails
        if (error instanceof z.ZodError) {
          const formattedErrors = error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          }));
          return res.status(400).json({ errors: formattedErrors });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const id = req.params.id;

    try {
      // Fetch the existing article first
      const existingArticle = await Articles.findByPk(id);
      if (!existingArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      const data = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.file ? req.file.filename : existingArticle.image,
      };

      try {
        articleSchema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors = error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          }));
          return res.status(400).json({ errors: formattedErrors });
        }
      }

      // Now perform the update
      const result = await Articles.update(data, { where: { id: id } });

      if (result[0] === 0) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({
        message: "Article updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export const deleteArticles = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Articles.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await Articles.destroy({ where: { id: id } });

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll({
      attributes: { exclude: ["tags"] },
    });

    res.status(200).json({
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Articles.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Return the article in the response
    res.status(200).json({
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
