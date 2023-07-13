const User = require('../models/user');

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Возвращаем данные пользователя без пароля
      const { id, name, email, username, phone, role } = user;
      res.json({ success: true, user: { id, name, email, username, phone, role } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to get user' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updates = req.body;

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Обновляем данные пользователя
      await User.update(req.userId, updates);

      res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to update user' });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { password } = req.body;

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Хешируем новый пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Обновляем пароль пользователя
      await User.updatePassword(req.userId, hashedPassword);

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to update password' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Удаляем пользователя
      await User.delete(req.userId);

      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to delete user' });
    }
  },
};

module.exports = userController;