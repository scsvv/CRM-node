const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, username, password, phone, role } = req.body;

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем нового пользователя
      const userId = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        phone,
        role,
      });

      res.json({ success: true, message: 'User registered successfully', userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to register user' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Проверяем наличие пользователя в базе данных
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Проверяем правильность пароля
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Создаем JWT-токен
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ success: true, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to login' });
    }
  },
};

module.exports = authController;