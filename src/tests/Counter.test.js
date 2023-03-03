import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "../components/Counter"

describe("Counter", () => {
    test("quando o botão de incremento for clicado 3x o contador deve aumentar 3x", async () => {
        // configuração do simulador de user (antes de tudo)
        const user = userEvent.setup()
        
        // renderização do componente
        render(<Counter />)

        // screen.logTestingPlaygroundURL()

        const incrementButton = screen.getByText("+")

        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(incrementButton)

        const value = screen.getByText("3")

        expect(value).toBeInTheDocument()
    })
})