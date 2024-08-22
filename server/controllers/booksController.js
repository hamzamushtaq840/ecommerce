import Joi from "joi";
import { booksModel } from "../models/booksModel.js";
import { userModel } from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { tryCatch } from "../utils/tryCatch.js";

const bookSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().required(),
});

export const addBook = tryCatch(async (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    throw new AppError(
      "MISSING_FIELD",
      `The ${error.details[0].context.label} field is required`,
      400
    );
  }

  const { name, description } = req.body;

  // check if user exists
  const user = await userModel.findById(req.user);
  if (!user) {
    throw new AppError("user_not_found", "User not found", 404);
  }

  // create new book
  const newBook = new booksModel({ name, description, user: req.user });
  await newBook.save();

  res.status(201).json({ message: "Book added successfully" });
});
