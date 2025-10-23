import React from "react";

export default function Boleta({ cliente, carrito, fecha, numeroBoleta, metodoPago, onClose }) {
  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="boleta-overlay">
      <div className="boleta-container">
        {/* Header */}
        <header className="boleta-header">
          <h2>🧾 BOLETA DE COMPRA – HuertoHogar</h2>
        </header>

        {/* Información del cliente y boleta */}
        <div className="boleta-info">
          <p>📅 Fecha: {fecha}</p>
          <p>🧍 Cliente: {cliente.nombre} {cliente.apellido}</p>
          <p>🛒 N° de boleta: #{numeroBoleta}</p>
        </div>

        <table className="boleta-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precio.toLocaleString()}</td>
                <td>${(producto.precio * producto.cantidad).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="boleta-total">
          <h3>💰 Total a pagar: ${total.toLocaleString()}</h3>
          <p>Método de pago: {metodoPago}</p>
        </div>

    
        <p className="boleta-footer">Gracias por tu compra en HuertoHogar 🌱</p>

        <button className="boleta-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
