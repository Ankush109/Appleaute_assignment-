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
  async getCategories(req, res, next) {
    try {
      const categories = await prisma.category.findMany();
      console.log(categories, "dsds");
      res.json({
        status: 200,
        data: categories,
      });
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
  async getProductsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      console.log(categoryId);
      const products = await prisma.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });
      res.json(customResponse(200, products));
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
      if (!categoryId) {
        return next(createError.BadRequest("Category id is required"));
      }
      res.json(customResponse(200, product));
    } catch (err) {
      return next(createError.InternalServerError(err.message));
    }
  },
  async getProducts(req, res, next) {
    try {
      const products = await prisma.product.findMany();
      res.json(customResponse(200, products));
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError(err.message));
    }
  },
};
export default productController;
