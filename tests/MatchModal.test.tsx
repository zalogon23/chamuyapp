import React from "react"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import MatchModal from "../components/MatchModal"
import userEvent from "@testing-library/user-event"

describe("Match Modal", () => {
  afterEach(cleanup)
  it("renders the modal", () => {
    render(<MatchModal open={true} />)
    const modal = screen.getByRole("dialog")

    expect(modal).toBeInTheDocument()
  })
  it("has heading saying you had a match", () => {
    render(<MatchModal open={true} />)
    const heading = screen.getByRole("heading", { name: /\bmatch\b/i })

    expect(heading).toBeInTheDocument()
  })
  it("shows the name of the corresponding matched user", () => {
    const name = "Manolo"
    render(<MatchModal open={true} name={name} />)

    const disclaimer = screen.getByText(/\bmanolo\b/i)
    expect(disclaimer).toBeInTheDocument()
  })

  it("doesnt show when passed open is false", () => {
    render(<MatchModal open={false} />)

    const modal = screen.queryByRole("dialog")
    expect(modal).not.toBeInTheDocument()
  })
  it("runs the redirect function when clicked on 'chat' button", () => {
    const redirect = jest.fn()
    render(<MatchModal open={true} redirect={redirect} />)

    const button = screen.getByRole("button", { name: /\bchat/i })
    userEvent.click(button)
    expect(redirect).toHaveBeenCalled()
  })
  it("closes when you click on close button", async () => {
    render(<MatchModal open={true} />)

    const button = screen.getByRole("button", { name: /cerrar/i })
    expect(button).toBeInTheDocument()
    userEvent.click(button)

    const modal = screen.queryByRole("dialog")
    expect(modal).not.toBeInTheDocument()
  })
  it("closes when you click on close cross", async () => {
    render(<MatchModal open={true} />)

    const cross = screen.getByRole("button", { name: /close/i })
    expect(cross).toBeInTheDocument()
    userEvent.click(cross)

    const modal = screen.queryByRole("dialog")
    expect(modal).not.toBeInTheDocument()
  })
  it("shows the corrensponding image if receives a string", () => {
    const name = "juan"
    const imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    render(<MatchModal open={true} name={name} image={imgUrl} />)

    const image = screen.getByRole("img") as HTMLImageElement
    expect(image.alt).toMatch(/juan/i)
    waitFor(() => {
      expect(image).toHaveAttribute("src", imgUrl)
    })
  })
})