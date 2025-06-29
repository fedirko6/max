// utils/auth.js

// Получить токен из localStorage
export const getToken = () => localStorage.getItem('token');

// Сохранить токен
export const saveToken = (token) => localStorage.setItem('token', token);

// Удалить токен (при выходе)
export const removeToken = () => localStorage.removeItem('token');

// Проверка авторизации
export const isAuthenticated = () => !!getToken();