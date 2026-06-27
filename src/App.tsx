import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Trips from './pages/Trips';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;