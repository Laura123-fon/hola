import React from "react";

export default function Product({ producto, onAddToCart }) {
  const { nombre, imagen, descripcion, precio, stock, origen, sostenibilidad, receta, calificacion } = producto;
  const renderStars = () => {
    const fullStars = Math.floor(calificacion);
    const halfStar = calificacion % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

   return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"} 
        {"☆".repeat(emptyStars)}
      </>
    );
  }
  return (
    <div className="product-card">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p><strong>Precio:</strong> ${precio.toLocaleString()} CLP</p>
      <p><strong>Stock:</strong> {stock}</p>
      <p><strong>Origen:</strong> {origen}</p>
      <p><strong>Prácticas sostenibles:</strong> {sostenibilidad}</p>
      <p><strong>Receta sugerida:</strong> {receta}</p>
      <p className="product-rating">{renderStars()} ({calificacion.toFixed(1)})</p>
      <button 
        onClick={() => onAddToCart(producto)} 
        disabled={stock === 0}
        className={stock === 0 ? "disabled" : ""}
      >
        {stock === 0 ? "Agotado" : "Agregar al carrito"}
      </button>
    </div>
  );
}

