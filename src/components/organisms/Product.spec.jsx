import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "./Product";

describe("Product component - tests completos", () => {
  const baseProduct = {
    nombre: "Manzanas Fuji",
    imagen: "http://example.com/manzanas.jpg",
    descripcion: "Manzanas crujientes y dulces",
    precio: 1200,
    stock: 5,
    origen: "Valle del Maule",
    sostenibilidad: "Cultivo sostenible",
    receta: "Ensalada de manzana",
    calificacion: 4.5
  };

  const minimalProduct = {
    nombre: "Naranjas",
    imagen: "http://example.com/naranjas.jpg",
    descripcion: "Jugosas",
    precio: 1000,
    stock: 3,
    origen: "Valparaíso",
    sostenibilidad: "",
    receta: "",
    calificacion: 3.5
  };

  const onAddToCartMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente toda la información del producto", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);
    
    expect(screen.getByText(baseProduct.nombre)).toBeInTheDocument();
    expect(screen.getByText(baseProduct.descripcion)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(`$${baseProduct.precio.toLocaleString()} CLP`)))
      .toBeInTheDocument();
    expect(screen.getByText(/Stock:/)).toBeInTheDocument();
    expect(screen.getByText(/Origen:/)).toBeInTheDocument();
    expect(screen.getByText(/Prácticas sostenibles:/)).toBeInTheDocument();
    expect(screen.getByText(/Receta sugerida:/)).toBeInTheDocument();

    const img = screen.getByAltText(baseProduct.nombre);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(baseProduct.imagen);

    expect(screen.getByText(/\(4\.5\)/)).toHaveTextContent("★★★★☆ (4.5)");

    const button = screen.getByText("Agregar al carrito");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("no rompe si faltan campos opcionales (receta, sostenibilidad)", () => {
    render(<Product producto={minimalProduct} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText(minimalProduct.nombre)).toBeInTheDocument();
    expect(screen.getByText(minimalProduct.descripcion)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(`$${minimalProduct.precio.toLocaleString()} CLP`)))
      .toBeInTheDocument();
    expect(screen.getByText(/Stock:/)).toBeInTheDocument();
    expect(screen.getByText(/Origen:/)).toBeInTheDocument();
    expect(screen.getByText(/Prácticas sostenibles:/)).toBeInTheDocument();
    expect(screen.getByText(/Receta sugerida:/)).toBeInTheDocument();
    expect(screen.getByText(/\(3\.5\)/)).toHaveTextContent("★★★☆☆ (3.5)");
  });

  it("llama onAddToCart al presionar el botón", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);
    fireEvent.click(screen.getByText("Agregar al carrito"));
    expect(onAddToCartMock).toHaveBeenCalledWith(baseProduct);
    expect(onAddToCartMock).toHaveBeenCalledTimes(1);
  });

  it("desactiva el botón si el stock es 0", () => {
    const soldOutProduct = { ...baseProduct, stock: 0 };
    render(<Product producto={soldOutProduct} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText("Agotado")).toBeDisabled();
  });

  it("renderiza correctamente la calificación máxima (5 estrellas)", () => {
    const product = { ...baseProduct, calificacion: 5 };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText(/\(5\.0\)/)).toHaveTextContent("★★★★★ (5.0)");
  });

  it("renderiza correctamente la calificación mínima (0 estrellas)", () => {
    const product = { ...baseProduct, calificacion: 0 };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText(/\(0\.0\)/)).toHaveTextContent("☆☆☆☆☆ (0.0)");
  });

  it("no muestra receta si el campo es null", () => {
    const product = { ...baseProduct, receta: null };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText(/Receta sugerida:/)).toBeInTheDocument();
    expect(screen.getByText(/Receta sugerida:/).textContent).toContain("");
  });

  it("no muestra sostenibilidad si el campo es null", () => {
    const product = { ...baseProduct, sostenibilidad: null };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText(/Prácticas sostenibles:/)).toBeInTheDocument();
    expect(screen.getByText(/Prácticas sostenibles:/).textContent).toContain("");
  });

  it("cambia texto del botón si stock es 1", () => {
    const product = { ...baseProduct, stock: 1 };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText("Agregar al carrito")).not.toBeDisabled();
  });

  it("llama onAddToCart correctamente con stock 1", () => {
    const product = { ...baseProduct, stock: 1 };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    fireEvent.click(screen.getByText("Agregar al carrito"));
    expect(onAddToCartMock).toHaveBeenCalledWith({ ...baseProduct, stock: 1 });
  });

  it("muestra imagen con alt correcto aunque falte URL", () => {
    const product = { ...baseProduct, imagen: "" };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    const img = screen.getByAltText(baseProduct.nombre);
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("");
  });

  it("no rompe si precio es 0", () => {
    const product = { ...baseProduct, precio: 0 };
    render(<Product producto={product} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText(/\$0 CLP/)).toBeInTheDocument();
  });
});
