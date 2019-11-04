import * as Yup from 'yup';
import Book from '../models/Book';

const attributes = ['id', 'title', 'isbn', 'category', 'year'];
const limit = 20;

class BookController {
  async store(req, res) {
    try {
      const schema = Yup.object({
        title: Yup.string().required(),
        isbn: Yup.string().required(),
        category: Yup.string().required(),
        year: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const bookExists = await Book.findOne({
        where: { isbn: req.body.isbn },
      });
      if (bookExists) {
        return res.status(400).json({ error: 'Book already exists' });
      }
      const { id, title, category } = await Book.create(req.body);
      return res.json({ id, title, category });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object({
        title: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { title } = req.body;

      if (title) {
        const bookExists = await Book.findOne({
          where: { title: req.body.title },
        });
        if (bookExists) {
          return res.status(400).json({ response: 'Book already exists' });
        }
      }

      const { id } = req.params;

      const book = await Book.findOne({ where: { id } });

      await book.update({ title: req.body.title });

      return res.json({ id, title });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async delete(req, res) {
    try {
      const schema = Yup.object({
        title: Yup.string().required(),
        isbn: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { isbn } = req.body;

      const { id, title } = await Book.destroy({ where: { isbn } }, req.body);

      return res.json({ id, title });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    try {
      const books = await Book.findAll({
        attributes,
        limit,
        offset: (page - 1) * limit,
      });

      return res.json(books);
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const book = await Book.findOne({
        where: { id },
        attributes,
      });

      return res.json(book);
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }
}

export default new BookController();
