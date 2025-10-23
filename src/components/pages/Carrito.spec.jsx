import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Carrito from "./Carrito";
import { CartContext } from "../organisms/CartContext";

// --- MOCKS GLOBALES ---
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

window.alert = jest.fn();

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// --- DATOS DE PRUEBA ---
const mockProducts = [
  {
    id: "1",
    nombre: "Manzanas Fuji",
    imagen: "http://example.com/manzanas.jpg",
    precio: 1200,
    cantidad: 2,
  },
  {
    id: "2",
    nombre: "Naranjas",
    imagen: "http://example.com/naranjas.jpg",
    precio: 1000,
    cantidad: 3,
  },
];

const mockCartContext = {
  carrito: mockProducts,
  eliminarDelCarrito: jest.fn(),
  actualizarCantidad: jest.fn(),
  limpiarCarrito: jest.fn(),
};

// --- AUXILIAR PARA RENDER CON CONTEXTO ---
const renderWithContext = (context = mockCartContext) => {
  return render(
    <CartContext.Provider value={context}>
      <Carrito />
    </CartContext.Provider>
  );
};

// --- TEST SUITE ---
describe("Carrito component - exhaustive tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === "nombre") return "Juan";
      if (key === "apellido") return "Pérez";
      if (key === "usuario") return "juan.perez@test.cl";
      return null;
    });
  });

  it("renderiza correctamente todos los productos en el carrito", () => {
    renderWithContext();
    mockProducts.forEach((p) => {
      expect(screen.getByText(p.nombre)).toBeInTheDocument();
      expect(screen.getByDisplayValue(p.cantidad.toString())).toBeInTheDocument();
      expect(screen.getByText(`$${p.precio.toLocaleString()}`)).toBeInTheDocument();
      expect(screen.getByText(`$${(p.precio * p.cantidad).toLocaleString()}`)).toBeInTheDocument();
    });
  });

  it("muestra mensaje de carrito vacío cuando no hay productos", () => {
    renderWithContext({ ...mockCartContext, carrito: [] });
    expect(
      screen.getByText("Tu carrito está vacío. ¡Agrega productos desde el catálogo!")
    ).toBeInTheDocument();
  });

  it("calcula correctamente el total del carrito y lo muestra en el footer", () => {
    renderWithContext();
    const total = mockProducts
      .reduce((acc, p) => acc + p.precio * p.cantidad, 0)
      .toLocaleString();
    expect(screen.getByText(`Total a pagar: $${total}`)).toBeInTheDocument();
  });

  it("llama a eliminarDelCarrito al presionar el botón de quitar (✕)", () => {
    renderWithContext();
    const deleteButtons = screen.getAllByRole("button", { name: "✕" });
    fireEvent.click(deleteButtons[0]);
    expect(mockCartContext.eliminarDelCarrito).toHaveBeenCalledWith(mockProducts[0].id);
  });

  it("llama a actualizarCantidad al cambiar la cantidad manualmente", () => {
    renderWithContext();
    const quantityInput = screen.getByDisplayValue(mockProducts[0].cantidad.toString());
    fireEvent.change(quantityInput, { target: { value: "5" } });
    expect(mockCartContext.actualizarCantidad).toHaveBeenCalledWith(mockProducts[0].id, 5);
  });

  it("llama a actualizarCantidad al presionar el botón de aumentar (+)", () => {
    renderWithContext();
    const increaseButton = screen.getAllByRole("button", { name: "+" })[0];
    fireEvent.click(increaseButton);
    expect(mockCartContext.actualizarCantidad).toHaveBeenCalledWith(mockProducts[0].id, mockProducts[0].cantidad + 1);
  });

  it("llama a actualizarCantidad al presionar el botón de disminuir (-)", () => {
    renderWithContext();
    const decreaseButton = screen.getAllByRole("button", { name: "-" })[0];
    fireEvent.click(decreaseButton);
    expect(mockCartContext.actualizarCantidad).toHaveBeenCalledWith(mockProducts[0].id, mockProducts[0].cantidad - 1);
  });

  it("renderiza correctamente la imagen de cada producto", () => {
    renderWithContext();
    mockProducts.forEach((p) => {
      const img = screen.getByAltText(p.nombre);
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(p.imagen);
    });
  });

  it("carga datos de cliente (nombre, apellido, correo) desde localStorage al inicio", async () => {
    renderWithContext();
    await waitFor(() => {
      expect(screen.getByDisplayValue("Juan")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Pérez")).toBeInTheDocument();
      expect(screen.getByDisplayValue("juan.perez@test.cl")).toBeInTheDocument();
    });
  });

  it("actualiza el estado del formulario de dirección al escribir", () => {
    renderWithContext();
    const direccionInput = screen.getByPlaceholderText("Ej: Calle Los Álamos 1234");
    fireEvent.change(direccionInput, { target: { value: "Av. Falsa 123" } });
    expect(direccionInput.value).toBe("Av. Falsa 123");
  });

  it("muestra alerta y no navega si faltan datos obligatorios de dirección al comprar", () => {
    renderWithContext();
    const direccionInput = screen.getByPlaceholderText("Ej: Calle Los Álamos 1234");
    fireEvent.change(direccionInput, { target: { value: "Dirección de prueba" } });
    const comprarButton = screen.getByRole("button", { name: "Comprar" });
    fireEvent.click(comprarButton);
    expect(window.alert).toHaveBeenCalledWith(
      "Por favor completa todos los datos del cliente y de entrega."
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockCartContext.limpiarCarrito).not.toHaveBeenCalled();
  });

  it("muestra alerta si el carrito está vacío y se intenta comprar", () => {
    renderWithContext({ ...mockCartContext, carrito: [] });
    const comprarButton = screen.getByRole("button", { name: "Comprar" });
    fireEvent.click(comprarButton);
    expect(window.alert).toHaveBeenCalledWith("Tu carrito está vacío 😢");
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockCartContext.limpiarCarrito).not.toHaveBeenCalled();
  });

  it("navega a /boleta y limpia el carrito cuando la compra es exitosa (todos los campos llenos)", () => {
    renderWithContext();
    fireEvent.change(screen.getByPlaceholderText("Ej: Calle Los Álamos 1234"), {
      target: { value: "Av. Éxito 456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ej: Región del Biobío"), {
      target: { value: "Metropolitana" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ej: Concepción"), {
      target: { value: "Santiago" },
    });
    const comprarButton = screen.getByRole("button", { name: "Comprar" });
    fireEvent.click(comprarButton);

    expect(window.alert).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockCartContext.limpiarCarrito).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/boleta", {
      state: {
        cliente: {
          nombre: "Juan",
          apellido: "Pérez",
          correo: "juan.perez@test.cl",
          direccion: "Av. Éxito 456",
          departamento: "",
          region: "Metropolitana",
          comuna: "Santiago",
          indicaciones: "",
        },
        carrito: mockProducts,
        metodoPago: "Tarjeta",
      },
    });
  });

  it("limita la cantidad manual a 100 si se ingresa un valor muy alto", () => {
    renderWithContext();
    const quantityInput = screen.getByDisplayValue(mockProducts[0].cantidad.toString());
    fireEvent.change(quantityInput, { target: { value: "999" } });
    expect(mockCartContext.actualizarCantidad).toHaveBeenCalledWith(mockProducts[0].id, 100);
  });

  it("establece la cantidad a 1 si se ingresa un valor no numérico o cero", () => {
    renderWithContext();
    const quantityInput = screen.getByDisplayValue(mockProducts[0].cantidad.toString());
    fireEvent.change(quantityInput, { target: { value: "abc" } });
    expect(mockCartContext.actualizarCantidad).toHaveBeenCalledWith(mockProducts[0].id, 1);
    fireEvent.change(quantityInput, { target: { value: "0" } });
    expect(mockCartContext.actualizarCantidad).toHaveBeenCalledWith(mockProducts[0].id, 1);
  });
});
