import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// To Save new books
router.post('/', async (req, res) => {
	try {
		if (
			!req.body.title ||
			!req.body.author ||
			!req.body.description ||
			!req.body.publishedYear
		) {
			return res.status(400).json({ message: 'Please fill all required fields' });
		}
		const newBook = {
			title: req.body.title,
			author: req.body.author,
			description: req.body.description,
			publishedYear: req.body.publishedYear,
		};

		const book = await Book.create(newBook);

		return res.status(201).send({ book });
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

// To get all the books
router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		return res.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// To get book by id
router.get('/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).json({ book });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// To update book by id
router.put('/:id', async (req, res) => {
	try {
		if (
			!req.body.title ||
			!req.body.author ||
			!req.body.description ||
			!req.body.publishedYear
		) {
			return res.status(400).json({ message: 'Please fill all required fields' });
		}

		const { id } = req.params;

		const result = await Book.findByIdAndUpdate(id, req.body);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		return res.status(200).json({ message: 'Book updated successfully' });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// To delete book by id
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const result = await Book.findByIdAndDelete(id);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		return res.status(200).json({ message: 'Book deleted successfully' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
});

export default router;
