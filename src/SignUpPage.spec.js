import SignUpPage from "./SignUpPage.svelte"
import { render, screen }  from "@testing-library/svelte"
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event"
//import axios from 'axios'
import "whatwg-fetch" // polyfills fetch 
import { setupServer } from "msw/node"
import { rest } from "msw"

describe("Sign Up Page", () => {
    describe("Layout", () => {
        it("has Sign Up header", () => {
            render(SignUpPage)
            const header = screen.getByRole("heading", { name: "Sign Up"})
            expect(header).toBeInTheDocument()
        })
        it("has username input", () => {
            render(SignUpPage)
            const input = screen.getByLabelText("Username")
            expect(input).toBeInTheDocument()
        })
        it("has email input", () => {
            render(SignUpPage)
            const input = screen.getByLabelText("E-mail")
            expect(input).toBeInTheDocument()
        })
        it("has password input", () => {
            render(SignUpPage)
            const input = screen.getByLabelText("Password")
            expect(input).toBeInTheDocument()
        })

        it("has password type", () => {
            render(SignUpPage)
            const input = screen.getByLabelText("Password")
            expect(input.type).toBe("password")
        })
        it("has password repeat", () => {
            render(SignUpPage)
            const input = screen.getByLabelText("Password Repeat")
            expect(input).toBeInTheDocument()
        })

        it("has password type for repeat input", () => {
            render(SignUpPage)
            const input = screen.getByLabelText("Password Repeat")
            expect(input.type).toBe("password")
        })
        it("has Sign Up button", () => {
            render(SignUpPage)
            const button = screen.getByRole("button", { name: "Sign Up"})
            expect(button).toBeInTheDocument()
        })
        it("disables the button initially", () => {
            render(SignUpPage)
            const button = screen.getByRole("button", { name: "Sign Up"})
            expect(button).toBeDisabled()
        })
    })
    describe("Interactions", () => {
        it("enables the button when password & repeat have the same value", 
        async () => {
            render(SignUpPage)
            const passwordInput = screen.getByLabelText("Password")
            const passwordRepeatInput = screen.getByLabelText("Password Repeat")
            await userEvent.type(passwordInput, "P4ssword")
            await userEvent.type(passwordRepeatInput, "P4ssword" )
            const button = screen.getByRole("button", { name: "Sign Up"})
            expect(button).not.toBeDisabled()
        })

        it("sends username, email, password to b/end after clicking the button",
        async () => {
            let requestBody 
            // = { "username": "user1",
            // "email": "user1@mail.com",
            // "password": "P4ssword",}
            // MOCKOON set to above

            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    requestBody = req.body
                    return res(ctx,status(200))
                })
            )

            server.listen()
            
            render(SignUpPage);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("E-mail");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      
            await userEvent.type(usernameInput, "user1");
            await userEvent.type(emailInput, "user1@mail.com");
            await userEvent.type(passwordInput, "P4ssword");
            await userEvent.type(passwordRepeatInput, "P4ssword");
            const button = screen.getByRole("button", { name: "Sign Up" });
      
           

            await userEvent.click(button);
      
            await server.close()
            
            expect(requestBody).toEqual({
              "username": "user1",
              "email": "user1@mail.com",
              "password": "P4ssword",
            });
          });
    })
})


