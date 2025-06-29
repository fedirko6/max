import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        removeToken();
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  if (!user) return <p>Загрузка профиля...</p>;

  return (
    <div>
      <h2>Профиль</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Баланс:</strong> ${user.balance}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Profile;