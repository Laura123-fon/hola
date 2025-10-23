import React from "react";

export default function PerfilUsuario({ onLogout }) {
  const nombre = localStorage.getItem("nombre") || "";
  const apellido = localStorage.getItem("apellido") || "";
  const correo = localStorage.getItem("usuario") || "";

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>
      <div className="perfil-info">
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Apellido:</strong> {apellido}</p>
        <p><strong>Correo:</strong> {correo}</p>
      </div>
      <button className="btn-logout" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
