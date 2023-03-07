import express from 'express';
import Joi from 'joi';
import { userModel } from '../models/userModel.js'
import { tryCatch } from '../utils/tryCatch.js';
import AppError from '../utils/AppError.js';


const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const register = tryCatch(async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        throw new AppError('MISSING_FIELD', `The '${error.details[0].context.label}' field is required.`, 400);
    }

    const { name, email, password } = req.body;

    // check if email already exists
    const user = await userModel.findOne({ email });
    if (user) {
        throw new AppError('account_exist', 'Email already exists', 401)
    }

    // create new user
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
})


export const login = tryCatch(async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        throw new AppError('MISSING_FIELD', `The '${error.details[0].context.label}' field is required.`, 400);
    }
    const { email, password } = req.body;

    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new AppError('account_not_found', 'Email not found, please create an account', 401)
    }

    // match password
    const passwordMatch = password === user.password;
    if (!passwordMatch) {
        throw new AppError('invalid_password', 'The password you entered is incorrect', 401)
    }

    res.status(200).json({ message: 'Login successful' });
});