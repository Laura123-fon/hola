import { Link } from "react-router-dom";

export default function Header({ onLogout }) {
  return (
    <header>
      <div className="logo">
        <img src="./imagenes/huertohogar" alt="HuertoHogar Logo" />
      </div>
      <nav>
        <Link to="/" className="btn btn-primary">Inicio</Link>
        <Link to="/catalog" className="btn btn-primary">Catálogo</Link>
        <Link to="/carrito" className="btn btn-primary">Carrito</Link>
    </nav>

    </header>
  );
}
