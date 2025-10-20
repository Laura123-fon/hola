import { fireEvent, render, screen } from "@testing-library/react"
import Cart from "./Carrito"
import React from "react"



describe('Cart Page', () => {
    const mockProducts = [
        {
            code: "1",
            image: "http://example.com/imagen1.png",
            name: "Oso patriarcal",
            description: "Oso hetero machista",
            price: "19990"
        },
        {
            code: "2",
            image: "http://example.com/imagen2.png",
            name: "Oso africano",
            description: "Oso XXXXL",
            price: "5990"
        }
    ]

    Storage.prototype.getItem = jest.fn(() =>
        JSON.stringify(mockProducts))
    Storage.prototype.removeItem = jest.fn()

    it('Muestra correctamente productos', () => {
        render(<Cart />)
        expect(screen.getByText("Oso patriarcal")).toBeInTheDocument()
        expect(screen.getByText("Oso africano")).toBeInTheDocument()
        expect(screen.getByText("🛒2")).toBeInTheDocument()
    })

    it('elimina carrito al presionar vaciar', () => {
        render(<Cart />)
        const button = screen.getByText('Vaciar carrito')
        fireEvent.click(button)
        expect(localStorage.removeItem).toHaveBeenCalledWith('products')
    })
})