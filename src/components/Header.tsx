import { NavLink, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';

function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <NavLink to="/" className="brand-link">
        Travel Notes
      </NavLink>

      <nav className="nav">
        <NavLink to="/trips">
          Мои путешествия
        </NavLink>
      </nav>

      {user && (
        <div className="user-panel">
          <span>{user.email}</span>

          <button
            type="button"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;