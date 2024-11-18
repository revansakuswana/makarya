import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.jwt; // Ambil token dari cookie

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Simpan informasi user di request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
