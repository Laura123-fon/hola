import React from "react";
import { Link } from "react-router-dom"; // Import necesario

const LandingPage = () => {
  return (
    <div className="huertohogar-page">
      <section className="hero">
        <div className="hero-content">
          <h1>BIENVENIDO A HUERTOHOGAR</h1>
          <p id="personalWelcome">¡Disfruta tu experiencia de compra!</p>
          <p>Empieza tus compras con nosotros a partir de hoy.</p>

          <Link to="/catalog" className="btn btn-primary">
            Ir a Comprar
          </Link>
        </div>
      </section>

      <section className="about-section">
        <div className="map-section">
          <h3>Encuéntranos en nuestras tiendas físicas</h3>
          <ul>
            <li>Santiago</li>
            <li>Puerto Montt</li>
            <li>Villarica</li>
            <li>Nacimiento</li>
            <li>Viña del Mar</li>
            <li>Valparaíso</li>
            <li>Concepción</li>
          </ul>
          <div id="huertoHogarMap"></div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
