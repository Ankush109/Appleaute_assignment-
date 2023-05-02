import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
const prisma = new PrismaClient();
const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .strict()
  .refine(
    ({ confirmPassword, password }) => {
      return confirmPassword === password;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords don't match",
    }
  );
const registerController = {
  async register(req, res, next) {
    try {
      const resp = await registerSchema.parseAsync(req.body);
      delete resp.confirmPassword;
      const user = await prisma.user.findUnique({
        where: {
          email: resp.email,
        },
      });
      if (user) {
        res.status(400).json({
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(resp.password, salt);
      const data = {
        ...resp,
        password: hashedPassword,
      };
      const createduser = await prisma.user.create({
        data,
      });
      res.status(200).json({
        message: "User created successfully",
        createduser,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
export default registerController;
