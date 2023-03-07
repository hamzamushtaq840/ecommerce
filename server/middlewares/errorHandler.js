import AppError from "../utils/AppError.js";

export const errorHandler = (error, req, res, next) => {

    if (error instanceof AppError)
        return res.status(error.statusCode).json({ errorCode: error.errorCode, message: error.message });
    else
        return res.status(500).json({ error: 'something went wrong' });
}