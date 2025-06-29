import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setMessage(res.data.message);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit">Войти</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;