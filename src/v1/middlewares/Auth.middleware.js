import prisma from "../../prisma/index";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  /* 0th index is "Bearer" and 1st index is the " JWT Token" */
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.USER_ACCESS_SECRET);
    console.log(decoded);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded,
      },
    });
    if (!user) {
      return next(createError.Unauthorized());
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next(createError.Unauthorized());
  }
};

export default authMiddleware;
