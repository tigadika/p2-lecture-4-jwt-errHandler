const { compare } = require('bcrypt');
const { Movie, User } = require('../models');
const { createToken } = require('../helpers/jwt');

class Controller {
  static async register(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.create({ email, password });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email or password cannot empty' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const comparePassword = compare(password, user.password);

      if (!comparePassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const access_token = createToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.findAll();

      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getOneMovie(req, res) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id);

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.status(200).json(movie);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async postMovie(req, res) {
    try {
      const { title, releaseYear, imageUrl, genreId, userId } = req.body;

      const movie = await Movie.create({ title, releaseYear, imageUrl, genreId, userId });

      res.status(201).json(movie);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  static async deleteOneMovie(req, res) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id);

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      await Movie.destroy({ where: { id } });

      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = Controller