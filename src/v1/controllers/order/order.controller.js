import prisma from "../../../prisma";
import { customResponse } from "../../../utils/Response";
import createError from "http-errors";
const orderController = {
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const userCart = await prisma.singleProductInCart.findMany({
        where: {
          userId,
        },
      });
      for (let i = 0; i < userCart.length && userCart.length > 0; i++) {
        await prisma.order.create({
          data: {
            productId: userCart[i].productId,
            userId,
          },
        });
      }
      await prisma.singleProductInCart.deleteMany({
        where: {
          userId,
        },
      });
      customResponse(res, 200, "Order created successfully");
    } catch (err) {
      console.log(err);
      next(createError.InternalServerError());
    }
  },
};
export default orderController;
