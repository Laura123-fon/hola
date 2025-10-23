import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../organisms/CartContext";
import Boleta from "../organisms/Boleta";

export default function BoletaPage() {
  const { carrito } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate(); 
  const [cliente, setCliente] = useState(location.state?.cliente || {});
  const [fecha, setFecha] = useState("");
  const [numeroBoleta, setNumeroBoleta] = useState(Math.floor(Math.random() * 1000000));
  const metodoPago = location.state?.metodoPago || "Tarjeta";

  useEffect(() => {
    const hoy = new Date();
    const fechaFormateada = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;
    setFecha(fechaFormateada);
  }, []);

  const handleClose = () => {
    navigate("/carrito"); 
  };
  return (
    <Boleta
      cliente={cliente}
      carrito={location.state?.carrito || carrito}
      fecha={fecha}
      numeroBoleta={numeroBoleta}
      metodoPago={metodoPago}
       onClose={handleClose}
    />
  );
}
