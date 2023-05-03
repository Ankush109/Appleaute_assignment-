import prisma from "../../../prisma";
import { customResponse } from "../../../utils/Response";
import createError from "http-errors";
const cartController = {
  async getUserCart(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          cart: {
            select: {
              id: true,
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
      console.log(user.cart);
      res.status(200).json({
        status: "success",
        message: user.cart,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  async addToCart(req, res, next) {
    try {
      const userId = req.user.id;

      const { productId } = req.body;

      await prisma.singleProductInCart.create({
        data: {
          productId,
          userId,
        },
      });

      res.json(customResponse(200, "Product added to cart successfully"));
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFromCart(req, res, next) {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      const cart = await prisma.singleProductInCart.findFirst({
        where: {
          productId,
          userId,
        },
      });

      if (!cart) {
        throw createError.NotFound("Product not found in cart");
      }

      await prisma.singleProductInCart.delete({
        where: {
          id: cart.id,
        },
      });

      res.json(customResponse(200, "Product deleted from cart successfully"));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
export default cartController;
