import React from "react"
import { render, screen } from "@testing-library/react"
import { MessageSender } from "../pages/messages/[id]"

describe("Message Sender COMPONENT", () => {
  const name = "anotheruser"
  let input: HTMLElement, button: HTMLElement
  beforeAll(() => {
    render(<MessageSender from={1} to={2} name={name} />)
    input = screen.getByRole("textbox")
    button = screen.getByRole("button")
  })
  it("should render an input and button", () => {
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})