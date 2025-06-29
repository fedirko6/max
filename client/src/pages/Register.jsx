import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage(res.data.message);
      // Можно сохранить токен в localStorage:
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
        <br />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;