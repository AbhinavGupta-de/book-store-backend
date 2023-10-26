import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.get('/', (req, res) => {
	console.log('GET request received');
	return res.status(200).send('Hello World!');
});

app.use('/books', booksRoute);

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
