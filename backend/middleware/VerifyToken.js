import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token; // Ambil token dari cookie
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    // Verifikasi token dan ekstrak payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Simpan userId di req untuk digunakan di controller
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
