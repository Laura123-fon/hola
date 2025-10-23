import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../organisms/CartContext";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito } =
    useContext(CartContext);

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
    departamento: "",
    region: "",
    comuna: "",
    indicaciones: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const nombre = localStorage.getItem("nombre") || "";
    const apellido = localStorage.getItem("apellido") || "";
    const correo = localStorage.getItem("usuario") || "";
    setCliente((prev) => ({ ...prev, nombre, apellido, correo }));
  }, []);

  const aumentarCantidad = (index) => {
    const producto = carrito[index];
    actualizarCantidad(producto.id, producto.cantidad + 1);
  };

  const disminuirCantidad = (index) => {
    const producto = carrito[index];
    actualizarCantidad(producto.id, producto.cantidad - 1);
  };

  const cambiarCantidadManual = (index, valor) => {
    const producto = carrito[index];
    let cantidad = parseInt(valor, 10);
    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
    else if (cantidad > 100) cantidad = 100;
    actualizarCantidad(producto.id, cantidad);
  };

  const eliminarProducto = (index) => {
    const producto = carrito[index];
    eliminarDelCarrito(producto.id);
  };

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  const handleCompra = (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😢");
      return;
    }

    if (
      !cliente.nombre ||
      !cliente.apellido ||
      !cliente.correo ||
      !cliente.direccion ||
      !cliente.region ||
      !cliente.comuna
    ) {
      alert("Por favor completa todos los datos del cliente y de entrega.");
      return;
    }

    navigate("/boleta", {
      state: {
        cliente,
        carrito,
        metodoPago: "Tarjeta",
      },
    });

    limpiarCarrito();
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">
          Tu carrito está vacío. ¡Agrega productos desde el catálogo!
        </p>
      ) : (
        <>
          <table className="tabla-carrito">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Quitar</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto, index) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="carrito-img"
                    />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio.toLocaleString()}</td>
                  <td className="cantidad-cell">
                    <button onClick={() => disminuirCantidad(index)}>-</button>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={producto.cantidad}
                      onChange={(e) =>
                        cambiarCantidadManual(index, e.target.value)
                      }
                      className="input-cantidad"
                    />
                    <button onClick={() => aumentarCantidad(index)}>+</button>
                  </td>
                  <td>${(producto.precio * producto.cantidad).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(index)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <form className="formulario-cliente" onSubmit={handleCompra}>
        <h3>Datos del Cliente</h3>
        <div className="form-grid">
          <label>Nombre:</label>
          <input type="text" value={cliente.nombre} readOnly />
          <label>Apellido:</label>
          <input type="text" value={cliente.apellido} readOnly />
          <label>Correo:</label>
          <input type="email" value={cliente.correo} readOnly />
        </div>

        <h3>Dirección de Entrega</h3>
        <div className="form-grid">
          <label>Calle:</label>
          <input
            type="text"
            placeholder="Ej: Calle Los Álamos 1234"
            value={cliente.direccion}
            onChange={(e) =>
              setCliente({ ...cliente, direccion: e.target.value })
            }
            required
          />

          <label>Departamento (opcional):</label>
          <input
            type="text"
            placeholder="Ej: Depto 502"
            value={cliente.departamento}
            onChange={(e) =>
              setCliente({ ...cliente, departamento: e.target.value })
            }
          />

          <label>Región:</label>
          <input
            type="text"
            placeholder="Ej: Región del Biobío"
            value={cliente.region}
            onChange={(e) => setCliente({ ...cliente, region: e.target.value })}
            required
          />

          <label>Comuna:</label>
          <input
            type="text"
            placeholder="Ej: Concepción"
            value={cliente.comuna}
            onChange={(e) => setCliente({ ...cliente, comuna: e.target.value })}
            required
          />

          <label>Indicaciones para la entrega (opcional):</label>
          <textarea
            placeholder="Ej: entre calles X e Y, edificio color beige, sin timbre..."
            value={cliente.indicaciones}
            onChange={(e) =>
              setCliente({ ...cliente, indicaciones: e.target.value })
            }
          />
        </div>

        <button type="submit">Comprar</button>
      </form>

      <footer className="carrito-footer">
        <div className="total-pagar">
          <h3>Total a pagar: ${total.toLocaleString()}</h3>
        </div>
      </footer>
    </div>
  );
}
