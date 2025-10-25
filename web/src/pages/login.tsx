import axios from "axios";
import { useRef } from "react";
import { Button, Input, Label } from "~/components";
import { http } from "~/services";
// handleSubmit = 

export const Login = () => {
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;
console.log(email, password);

    const response = await http.post("/auth", {
      email, password
    })
    const data = await response.data

    console.log(data);
    
  };
  return (
    <div className="container mx-auto my-2 space-y-2">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
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
  );
}
