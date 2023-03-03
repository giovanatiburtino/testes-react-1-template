import TodoList from "../components/TodoList"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("TodoList", () => {
    test("Deve renderizar com título", () => {
        render(<TodoList />)

        const title = screen.getByText(/todo list/i)
        expect(title).toBeInTheDocument()
    })

    test("Deve renderizar com input vazio", () => {
        render(<TodoList />)
        // screen.debug()
        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue("")
    })


    test("Deve renderizar o input", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

         // screen.logTestingPlaygroundURL()

        const toggleBtn = screen.getByRole("button", {
            name: /toggle/i
        })

        
        const item = screen.getByText("Revisar React")


        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")

    })

    test("Deve remover a tarefa quando botão for clicado", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Estudar Testes{enter}")

        const deleteBtn = screen.getByRole("button", {
            name: /delete/i
        })

        const item = screen.getByText("Estudar Testes")

        await user.click(deleteBtn)
        expect(item).not.toBeInTheDocument()
    })
})