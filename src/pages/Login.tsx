import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { users } from '../data/users';
import { useAuthStore } from '../store/authStore';

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      setError('Неверный email или пароль');
      return;
    }

    login(foundUser.email);

    navigate('/trips');
  };

  return (
    <main className="login-page">
      <section className="login-card">

        <h1>Авторизация</h1>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <label>
            Email

            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </label>

          <label>
            Пароль

            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </label>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Войти
          </button>

        </form>

      </section>
    </main>
  );
}

export default Login;