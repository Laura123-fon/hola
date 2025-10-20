import React, { useState, useEffect } from "react";
import Product from "../organisms/Product";

const productos = [
  { id: 'FR001', nombre: 'Manzanas Fuji', categoria: 'frutas', precio: 1200, stock: 150, descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.', imagen: './imagenes/manzanas.jpg' },
  { id: 'FR002', nombre: 'Naranjas Valencia', categoria: 'frutas', precio: 1000, stock: 200, descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos.', imagen: './imagenes/Naranjas.png' },
  { id: 'FR003', nombre: 'Plátanos Cavendish', categoria: 'frutas', precio: 800, stock: 250, descripcion: 'Plátanos maduros y dulces, perfectos para desayuno o snack.', imagen: './imagenes/Plátanos.png' },
  { id: 'VR001', nombre: 'Zanahorias Orgánicas', categoria: 'verduras', precio: 900, stock: 100, descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en O\'Higgins.', imagen: './imagenes/Zanahoria.jpg' },
  { id: 'VR002', nombre: 'Espinacas Frescas', categoria: 'verduras', precio: 700, stock: 80, descripcion: 'Perfectas para ensaladas y batidos verdes.', imagen: './imagenes/Espinacas.png' },
  { id: 'VR003', nombre: 'Pimientos Tricolores', categoria: 'verduras', precio: 1500, stock: 120, descripcion: 'Ricos en antioxidantes y vitaminas, ideales para salteados.', imagen: './imagenes/Pimientos.png' },
  { id: 'PO001', nombre: 'Miel Orgánica', categoria: 'organicos', precio: 5000, stock: 50, descripcion: 'Miel pura y orgánica producida por apicultores locales.', imagen: './imagenes/Miel.webp' },
  { id: 'PO003', nombre: 'Quinua Orgánica', categoria: 'organicos', precio: 3000, stock: 70, descripcion: 'Granos de quinua orgánica, perfectos para una dieta saludable.', imagen: './imagenes/Quinua.png' },
  { id: 'PL001', nombre: 'Leche Entera', categoria: 'lacteos', precio: 1200, stock: 100, descripcion: 'Leche fresca de granjas locales, rica en calcio.', imagen: './imagenes/leches.webp' }
];

export default function Catalogo() {
  const [filtro, setFiltro] = useState("all");
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prev, { 
          id: producto.id,
          name: producto.nombre,
          image: producto.imagen,
          price: producto.precio,
          cantidad: 1
        }];
      }
    });
    alert(`${producto.nombre} agregado al carrito 🛒`);
  };

  const productosFiltrados = filtro === "all"
    ? productos
    : productos.filter(p => p.categoria === filtro);

  return (
    <div className="catalog-page">
      <header className="cart-header">
        <h1>Catálogo de HuertoHogar</h1>
        <p>Carrito: {carrito.reduce((acc, item) => acc + item.cantidad, 0)} items</p>
        <a href="/" className="back-btn1">← Volver al inicio</a>
      </header>

      <section className="filters">
        <div className="filter-buttons">
          <button className={filtro === "all" ? "active" : ""} onClick={() => setFiltro("all")}>Todos</button>
          <button className={filtro === "frutas" ? "active" : ""} onClick={() => setFiltro("frutas")}>Frutas Frescas</button>
          <button className={filtro === "verduras" ? "active" : ""} onClick={() => setFiltro("verduras")}>Verduras Orgánicas</button>
          <button className={filtro === "organicos" ? "active" : ""} onClick={() => setFiltro("organicos")}>Productos Orgánicos</button>
          <button className={filtro === "lacteos" ? "active" : ""} onClick={() => setFiltro("lacteos")}>Productos Lácteos</button>
        </div>
      </section>

      <section className="product-list">
        {productosFiltrados.map(producto => (
          <Product key={producto.id} producto={producto} onAddToCart={agregarAlCarrito} />
        ))}
      </section>
    </div>
  );
}
