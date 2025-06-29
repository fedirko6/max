const mongoose = require('mongoose');

// Создаём схему пользователя
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // убирает пробелы в начале/конце
  },
  email: {
    type: String,
    required: true,
    unique: true, // нельзя повторно использовать
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  balance: {
    type: Number,
    default: 0 // начальный баланс
  },
  createdAt: {
    type: Date,
    default: Date.now // дата создания
  }
});

// Экспорт модели
module.exports = mongoose.model('User', UserSchema);