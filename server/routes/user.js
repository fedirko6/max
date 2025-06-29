const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// 👤 Профиль пользователя (по токену)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Ошибка профиля:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;