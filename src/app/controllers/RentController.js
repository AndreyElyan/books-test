import * as Yup from 'yup';
import Rent from '../models/Rent';

class RentController {
  async store(req, res) {
    const schema = Yup.object({
      book_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { book_id } = req.body;

    try {
      const rent = await Rent.create({
        user_id: req.userId,
        book_id,
        rented_at: Date.now(),
        canceled_at: null,
      });
      return res.json(rent);
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const rent = await Rent.findOne({ where: { id } });

      await rent.update({ returned_at: Date.now() });
      return res.json({ Response: 'Book returned' });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }
}

export default new RentController();
