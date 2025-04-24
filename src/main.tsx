import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/pages/loginPage";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/layout/protectedRoutes";
import "./index.css";
import RegisterPage from "./components/pages/registerPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                 <Route index element={<App />} />
                 <Route path="*" element={<Navigate to="/" replace />} />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
