import React from "react";

export default function Footer({ isLogged = false, onLogout = () => {} }) {
  return (
    <footer className="footer">
      <p>© 2025 HuertoHogar. Todos los derechos reservados.</p>
      {isLogged && (
        <button onClick={onLogout} className="logoutBtn">
          Cerrar sesión
        </button>
      )}
    </footer>
  );
}
