import { fireEvent, render, screen } from "@testing-library/react"
import Product from "./Product"
import React from "react"

beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => "[]")
    Storage.prototype.setItem = jest.fn()
})

describe('Product component', ()=>{
    const mockProduct = {
        code: "1",
        image: "http://example.com/imagen1.png",
        name: "Oso patriarcal",
        description: "Oso hetero machista",
        price: "19990"
    }
    it('renderiza correctamente el producto', ()=>{
        render(<Product {...mockProduct}/>)
        expect(screen.getByText("Oso patriarcal")).toBeInTheDocument()
        expect(screen.getByText("Oso hetero machista")).toBeInTheDocument()
        expect(screen.getByText("19990")).toBeInTheDocument()
    })

    it('llama a setItem al hacer click', ()=>{
        render(<Product {...mockProduct}/>)
        const button = screen.getByText('Añadir al carro')
        fireEvent.click(button)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'products', JSON.stringify([mockProduct])
        )
    })
})