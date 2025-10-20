import React from "react";

export default function Product({ producto, onAddToCart }) {
  const { id, nombre, imagen, descripcion, precio, stock } = producto;

  return (
    <div className="product-card">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p><strong>Precio:</strong> ${precio.toLocaleString()} CLP</p>
      <p><strong>Stock:</strong> {stock}</p>
      <button
        className="add-cart"
        onClick={() =>
          onAddToCart({
            id,
            name: nombre,
            image: imagen,
            price: precio,
            stock,
            cantidad: 1,
          })
        }
      >
        Agregar al carrito
      </button>
    </div>
  );
}
