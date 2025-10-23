import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartContext } from "../organisms/CartContext";
import Catalogo from "./Catalogo";

// Mock del CartContext
const mockCartContext = {
  carrito: [],
  agregarAlCarrito: jest.fn(),
};

describe("Catálogo de HuertoHogar", () => {

  beforeEach(() => {
    mockCartContext.carrito = [];
    mockCartContext.agregarAlCarrito.mockClear();
  });

  it("Muestra correctamente el título del catálogo", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText("Catálogo de HuertoHogar")).toBeInTheDocument();
  });

  it("Renderiza productos completos", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Naranjas Valencia")).toBeInTheDocument();
    expect(screen.getByText("Zanahorias Orgánicas")).toBeInTheDocument();
  });

  it("Muestra todos los productos al iniciar con filtro 'all'", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const productos = screen.getAllByRole("button", { name: /Agregar/i });
    expect(productos.length).toBeGreaterThanOrEqual(9); // Tenemos 9 productos
  });

  it("Filtra correctamente productos por categoría 'frutas'", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Frutas Frescas"));
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.queryByText("Zanahorias Orgánicas")).toBeNull();
  });

  it("Filtra correctamente productos por categoría 'verduras'", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Verduras Orgánicas"));
    expect(screen.getByText("Zanahorias Orgánicas")).toBeInTheDocument();
    expect(screen.queryByText("Manzanas Fuji")).toBeNull();
  });

  it("Filtra correctamente productos por categoría 'organicos'", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Productos Orgánicos"));
    expect(screen.getByText("Miel Orgánica")).toBeInTheDocument();
    expect(screen.queryByText("Leche Entera")).toBeNull();
  });

  it("Filtra correctamente productos por categoría 'lacteos'", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Productos Lácteos"));
    expect(screen.getByText("Leche Entera")).toBeInTheDocument();
    expect(screen.queryByText("Miel Orgánica")).toBeNull();
  });

  it("Agrega un producto al carrito y muestra toast", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton);
    expect(mockCartContext.agregarAlCarrito).toHaveBeenCalled();
    expect(screen.getByText(/agregado al carrito/i)).toBeInTheDocument();
  });

  it("Actualiza la cantidad total del carrito en la cabecera", () => {
    mockCartContext.carrito = [{ id: "FR001", cantidad: 2 }];
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText(/Carrito: 2 items/i)).toBeInTheDocument();
  });

  it("El toast desaparece al cerrar", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton);
    const closeToast = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeToast);
    expect(screen.queryByText(/agregado al carrito/i)).toBeNull();
  });

});
describe("Catálogo de HuertoHogar - tests adicionales", () => {

  it("No permite agregar al carrito productos agotados", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const soldOutButton = screen.getByText("Agotado");
    expect(soldOutButton).toBeDisabled();
  });

  it("Muestra mensaje cuando no hay productos en la categoría seleccionada", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Verduras Orgánicas"));
    // Suponiendo que ninguna verdura está en el catálogo mockeado
    expect(screen.queryByText("No hay productos disponibles")).toBeInTheDocument();
  });

  it("Mantiene el filtro activo visualmente", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const frutasBtn = screen.getByText("Frutas Frescas");
    fireEvent.click(frutasBtn);
    expect(frutasBtn.classList.contains("active")).toBe(true);
  });

  it("Filtra correctamente por búsqueda de nombre de producto", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const searchInput = screen.getByPlaceholderText("Buscar producto...");
    fireEvent.change(searchInput, { target: { value: "Manzanas" } });
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.queryByText("Naranjas Valencia")).toBeNull();
  });

  it("Filtra correctamente por rango de precio", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const minPriceInput = screen.getByPlaceholderText("Precio min");
    const maxPriceInput = screen.getByPlaceholderText("Precio max");
    fireEvent.change(minPriceInput, { target: { value: "1000" } });
    fireEvent.change(maxPriceInput, { target: { value: "1200" } });
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Naranjas Valencia")).toBeInTheDocument();
  });

  it("Resetea los filtros al presionar 'Mostrar todos'", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Frutas Frescas"));
    fireEvent.click(screen.getByText("Mostrar todos"));
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Zanahorias Orgánicas")).toBeInTheDocument();
  });

  it("Muestra correctamente la descripción corta en la tarjeta del producto", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText(/Manzanas crujientes/i)).toBeInTheDocument();
  });

  it("El botón de 'Agregar al carrito' llama a la función con el producto correcto", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton);
    expect(mockCartContext.agregarAlCarrito).toHaveBeenCalledWith(expect.objectContaining({ nombre: "Manzanas Fuji" }));
  });

  it("Deshabilita el botón de agregar si la cantidad máxima de stock está en el carrito", () => {
    mockCartContext.carrito = [{ id: "FR001", cantidad: 5 }]; // stock máximo
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    expect(addButton).toBeDisabled();
  });

  it("Actualiza el toast cuando se agrega otro producto diferente", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Catalogo />
        </BrowserRouter>
      </CartContext.Provider>
    );
    const addButton1 = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton1);
    expect(screen.getByText(/agregado al carrito/i)).toBeInTheDocument();

    const addButton2 = screen.getAllByText("Agregar al carrito")[1];
    fireEvent.click(addButton2);
    expect(screen.getByText(/agregado al carrito/i)).toBeInTheDocument();
  });

});
