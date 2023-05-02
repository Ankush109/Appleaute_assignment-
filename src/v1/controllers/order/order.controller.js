import prisma from "../../../prisma";
import { customResponse } from "../../../utils/Response";
import createError from "http-errors";
const orderController = {
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const { Items, address, city, country, postalCode, phone, total } =
        req.body;
    } catch (err) {}
  },
};
