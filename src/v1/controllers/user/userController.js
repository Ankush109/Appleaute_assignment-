import prisma from "../../../prisma";
import { customResponse } from "../../../utils/Response";
import createError from "http-errors";
const userController = {
  async getUser(req, res, next) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          cart: true,
          order: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  image: true,
                  category: true,
                },
              },
            },
          },
        },
      });
      res.json(customResponse(200, user));
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
};
export default userController;
