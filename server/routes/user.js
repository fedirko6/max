const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // твой middleware для проверки JWT

// Получение профиля текущего пользователя по токену
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // req.userId устанавливается в authMiddleware после успешной проверки токена
    const user = await User.findById(req.userId).select('-password'); // исключаем пароль из ответа
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;