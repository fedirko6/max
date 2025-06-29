const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');

const app = express();

app.use(cors());
app.use(express.json());

// 📦 Подключаем API-роуты
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 📁 Отдаём статику из React-приложения
app.use(express.static(path.join(__dirname, 'client', 'build')));

// 🧭 Обработка всех остальных маршрутов, кроме API
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).send('API not found');
  }
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// 🔌 Подключение к MongoDB и запуск сервера
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