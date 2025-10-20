import React, { useEffect, useState } from "react";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarrito(nuevoCarrito);
  };

  const cambiarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    alert("¡Gracias por tu compra! 🌱");
    guardarCarrito([]);
  };

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  return (
    <div className="cart-container">
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list">
            {carrito.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width={60} />
                <span className="cart-name">{item.name}</span>
                <input
                  type="number"
                  value={item.cantidad}
                  min={1}
                  className="cart-quantity"
                  onChange={e => cambiarCantidad(item.id, parseInt(e.target.value))}
                />
                <span className="cart-price">${(item.price * item.cantidad).toLocaleString()} CLP</span>
                <button className="cart-remove" onClick={() => eliminarProducto(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <h3 className="cart-total">Total: ${total.toLocaleString()} CLP</h3>
          <button className="buy-button" onClick={finalizarCompra}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
}
