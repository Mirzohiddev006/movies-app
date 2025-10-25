import { Label } from "@radix-ui/react-label"
import React, { useRef } from "react"
import { Button, Input } from "~/components"
import { http } from "~/services"

export const Register = () => {
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const usernameInput = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = usernameInput.current?.value
    const email = emailInput.current?.value
    const password = passwordInput.current?.value

    console.log(name, email, password);
    
    const response = await http.post("/users", {
      name, email, password
    })
    const data = await response.data

    console.log(data);
  }
  return (
    <div className="container mx-auto my-2 space-y-2">
      <h1 className="text-2xl font-bold">Register</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="username">Name</Label>
          <Input name="username" ref={usernameInput} type="text" id="username" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" ref={emailInput} type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="password">Password</Label>
          <Input name="password" ref={passwordInput} type="password" id="password" placeholder="Password" />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}