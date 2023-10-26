import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	console.log('GET request received');
	return res.status(200).send('Hello World!');
});

app.post('/books', async (req, res) => {
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
		return res.status(500).json({ error: error.message });
	}
});

app.get('/books', async (req, res) => {
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

app.get('/books/:id', async (req, res) => {
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

dotenv.config();
let mongodbURI = process.env.MONGODB_URL;
let PORT = process.env.PORT || 5555;

mongoose
	.connect(`${mongodbURI}`)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
