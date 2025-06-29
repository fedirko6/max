import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Router>
      <nav>
        {!isAuthenticated() ? (
          <>
            <Link to="/register">Регистрация</Link> | <Link to="/login">Вход</Link>
          </>
        ) : (
          <Link to="/profile">Профиль</Link>
        )}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;