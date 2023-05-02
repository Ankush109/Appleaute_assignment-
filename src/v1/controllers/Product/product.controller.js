import prisma from "../../../prisma";
import { customResponse } from "../../../utils/Response";
import createError from "http-errors";
const productController = {
  async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await prisma.category.create({
        data: {
          name,
        },
      });
      res.json(customResponse(200, category));
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
  async createProduct(req, res, next) {
    try {
      const { name, price, description, categoryId } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          price,
          description,
          categoryId,
        },
      });
      res.json(customResponse(200, product));
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
  async getProducts(req, res, next) {
    try {
      const products = await prisma.product.findMany();
      res.json(customResponse(200, products));
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
};
export default productController;
