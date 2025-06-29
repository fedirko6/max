const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    console.log('Регистрация - получены данные:', req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email уже используется' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    try {
      await newUser.save();
      console.log('Пользователь сохранён:', newUser._id);
    } catch (saveError) {
      console.error('Ошибка сохранения пользователя:', saveError);
      return res.status(500).json({ message: 'Ошибка при сохранении пользователя' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET не настроен');
      return res.status(500).json({ message: 'Ошибка сервера: JWT_SECRET не настроен' });
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Регистрация успешна',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance || 0
      }
    });
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;