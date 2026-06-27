import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Trips from './pages/Trips';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>

      {/* Авторизация */}

      <Route path="/login" element={<Login />} />

      {/* Основная страница */}

      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <Trips />
          </ProtectedRoute>
        }
      />

      {/* Если адрес неизвестен */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;