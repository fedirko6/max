// 📦 Импорт модулей — сначала
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// ⬇️ Загрузка переменных окружения из .env — сразу после импорта
dotenv.config();

// 📦 Импорт маршрутов — после dotenv
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// 🔐 Middlewares — подключаем middleware после создания app
app.use(cors());
app.use(express.json()); // чтобы сервер понимал JSON в запросах

// 🛣 Роуты — подключаем роуты к app
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

console.log('Запуск server.js — начало');

// 🌍 Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB подключён');

    // Запуск сервера только после успешного подключения к БД
    app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Сервер запущен на порту ${process.env.PORT || 5000}`);
});
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к MongoDB:', err);
  });