import * as Yup from 'yup';
import Favorite from '../models/Favorite';

const limit = 20;

const attributes = ['id', 'favorited_at', 'book_id'];

class FavoriteController {
  async store(req, res) {
    const schema = Yup.object({
      book_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { book_id } = req.body;

    try {
      const favorite = await Favorite.create({
        user_id: req.userId,
        book_id,
        favorited_at: Date.now(),
        returned_at: null,
      });
      return res.json(favorite);
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const favorite = await Favorite.findOne({ where: { id } });

      await favorite.update({ returned_at: Date.now() });
      return res.json({ Response: 'Book returned' });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    try {
      const favorites = await Favorite.findAll({
        attributes,
        offset: (page - 1) * limit,
      });

      return res.json(favorites);
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }
}

export default new FavoriteController();
