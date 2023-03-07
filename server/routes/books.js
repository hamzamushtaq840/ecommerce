const router = express.Router();
import express from 'express';
import { addBook } from '../controllers/booksController.js';

router.post('/add', addBook);

export default router;