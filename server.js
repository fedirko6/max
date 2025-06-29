// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Загружаем переменные окружения из .env
dotenv.config();

const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Тестовый маршрут для проверки сервера
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

// Подключаем роуты
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Подключение к MongoDB и запуск сервера
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB подключён');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Ошибка подключения к MongoDB:', err);
  });