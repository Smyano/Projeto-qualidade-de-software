import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Livros from "../pages/Livros.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Cadastro from "../pages/Cadastro.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/livros"
          element={
            <ProtectedRoute>
              <Livros />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;