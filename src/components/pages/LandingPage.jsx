import React from "react";
import { Link } from "react-router-dom";

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

      <section className="contexto-section container">
        <h2>Sobre HuertoHogar</h2>
        <p>
          HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos
          del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de
          experiencia, operamos en más de 9 puntos del país, incluyendo ciudades clave como Santiago,
          Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso y Concepción.
        </p>
        <p>
          Nuestro objetivo es conectar a las familias chilenas con el campo, promoviendo un estilo
          de vida saludable, sostenible y lleno de sabor.
        </p>
      </section>

      <section className="mision-vision-section container">
        <div className="mision">
          <h3>🌿 Misión</h3>
          <p>Proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta
            de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos
            a fomentar una conexión más cercana entre los consumidores y los agricultores locales,
            apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en todos
            los hogares chilenos.
          </p>
        </div>

        <div className="vision">
          <h3>🍃 Visión</h3>
          <p>Ser la tienda online líder en la distribución de productos frescos y naturales en Chile,
            reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la sostenibilidad.
            Aspiramos a expandir nuestra presencia a nivel nacional e internacional, estableciendo un nuevo
            estándar en la distribución de productos agrícolas directos del productor al consumidor.
          </p>
        </div>
      </section>


      <section className="map-section">
        <h3>Encuéntranos en nuestras tiendas físicas</h3>
        <ul>
          <li>Santiago</li>
          <li>Puerto Montt</li>
          <li>Villarrica</li>
          <li>Nacimiento</li>
          <li>Viña del Mar</li>
          <li>Valparaíso</li>
          <li>Concepción</li>
        </ul>

        <div id="huertoHogarMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.942022580017!2d-70.64826778480178!3d-33.456939980773606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c58f36e7a3cf%3A0x9e4e7cdbfc0d5ee5!2sSantiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1715638833298!5m2!1ses!2scl"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="mensaje-final container">
        <h3>🥑 ¡Descubre la frescura del campo con HuertoHogar!</h3>
        <p>
          Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.
          <br />
          ¡Únete a nosotros y disfruta de productos frescos y saludables, directo a tu hogar!
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
