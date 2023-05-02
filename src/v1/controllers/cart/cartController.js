import prisma from "../../../prisma";
import { customResponse } from "../../../utils/Response";
import createError from "http-errors";
const cartController = {
  async getUserCart(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await prisma.cart.findFirst({
        where: {
          userId,
        },
      });
      console.log(cart);
      if (cart === null) {
        throw createError.NotFound("Cart not found");
      }
      customResponse(res, 200, "Cart fetched successfully", cart);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  async addToCart(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          cart: true,
        },
      });
      const { productId } = req.body;
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      console.log(user);
      console.log(product);

      res.json(customResponse(200, "Product added to cart successfully"));
    } catch (err) {
      console.log(err);
    }
  },
};
export default cartController;
