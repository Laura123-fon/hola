import { useState } from "react";

export default function Login({ switchToRegister, onLogin }) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioGuardado = localStorage.getItem("usuario");
    const claveGuardada = localStorage.getItem("clave");

    if (correo === usuarioGuardado && clave === claveGuardada) {
      localStorage.setItem("logueado", "true");
      onLogin();
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta?{" "}
        <a href="#" onClick={switchToRegister}>
          Registrarse
        </a>
      </p>
      <p id="errorLogin">{error}</p>
    </div>
  );
}
