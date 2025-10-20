import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Catalogo from "./components/pages/Catalogo";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/organisms/Login";
import Register from "./components/organisms/Register";
import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";
import Carrito from "./components/pages/Carrito";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // Comprobar login al iniciar la app
  useEffect(() => {
    const logueado = localStorage.getItem("logueado");
    setIsLogged(logueado === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logueado");
    setIsLogged(false);
    setShowLogin(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header solo si está logueado */}
        {isLogged && <Header />}

        <Routes>
          {/* Rutas públicas: login/register */}
          {!isLogged && (
            <>
              <Route
                path="/"
                element={
                  showLogin ? (
                    <Login
                      switchToRegister={() => setShowLogin(false)}
                      onLogin={() => setIsLogged(true)}
                    />
                  ) : (
                    <Register switchToLogin={() => setShowLogin(true)} />
                  )
                }
              />
              {/* Si intentan acceder a rutas privadas, redirigir al login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          {/* Rutas privadas */}
          {isLogged && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <LandingPage />
                  </>
                }
              />
              <Route
                path="/catalog"
                element={
                  <>
                    <Catalogo />
                    
                      <div style={{ margin: "1rem" }}>
                        <Link to="/" className="btn btn-primary">
                          Volver al Inicio
                        </Link>
                      </div>

                  </>
                }
              />
              <Route
                path="/carrito"
                element={
                  <>
                    <Carrito />
                      <div style={{ margin: "1rem" }}>
                        <Link to="/" className="btn btn-primary">
                          Volver al Inicio
                        </Link>
                      </div>

                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>

        {/* Footer visible siempre, con botón cerrar sesión solo si logueado */}
        <Footer isLogged={isLogged} onLogout={handleLogout} />
      </div>
    </BrowserRouter>
  );
}

export default App;
