import * as Yup from 'yup';
import User from '../models/User';

// const attributes = ['id', 'email', 'name'];
// const limit = 20;

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
        age: Yup.number().required(),
        telphone: Yup.number().required,
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const { id, name, email } = await User.create(req.body);
      return res.json({ id, name, email });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        passwordConfirmation: Yup.string()
          .min(6)
          .when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
          ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email) {
        const userExists = await User.findOne({
          where: { email: req.body.email },
        });
        if (userExists) {
          return res.status(400).json({ response: 'User already exists' });
        }
      }

      if (email && email !== user.email) {
        const userExists = await User.findOne({
          where: { email },
        });
        if (userExists) {
          return res.status(400).json({ error: 'User already exists' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const { id, name } = await user.update(req.body);

      return res.json({ id, name });
    } catch (err) {
      return res.status(500).json({ message: 'Erro Internal' });
    }
  }

  // async index(req, res) {
  //   const { page = 1 } = req.query;

  //   try {
  //     const users = await User.findAll({
  //       attributes,
  //       limit,
  //       offset: (page - 1) * limit,
  //     });

  //     return res.json(users);
  //   } catch (err) {
  //     return res.status(500).json({ message: 'Erro Internal' });
  //   }
  // }

  // async show(req, res) {
  //   try {
  //     const book = await User.findOne({
  //       where: { email: req.query.email },
  //       attributes,
  //     });

  //     return res.json(book);
  //   } catch (err) {
  //     return res.status(500).json({ message: 'Erro Internal' });
  //   }
  // }
}

export default new UserController();
