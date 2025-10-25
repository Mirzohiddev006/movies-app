import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input, Label, Spinner } from "~/components";
import { http } from "~/services";
import { LogIn } from "lucide-react";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    if (!email || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setIsLoading(true);
    try {
      const response = await http.post("/auth", { email, password });
      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Muvaffaqiyatli kirdingiz!");
        window.location.href = "/movies";
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <div className="bg-primary/10 mx-auto flex size-12 items-center justify-center rounded-full">
            <LogIn className="text-primary size-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Xush kelibsiz!</h1>
          <p className="text-muted-foreground">Davom etish uchun hisobingizga kiring</p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email manzil</Label>
              <Input
                ref={emailInput}
                type="email"
                id="email"
                placeholder="sizning@email.com"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                ref={passwordInput}
                type="password"
                id="password"
                placeholder="••••••••"
                disabled={isLoading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Yuklanmoqda...
                </>
              ) : (
                "Kirish"
              )}
            </Button>
          </form>
        </div>
        <p className="text-muted-foreground text-center text-sm">
          Hisobingiz yo'qmi?{" "}
          <Link to="/auth/register" className="text-primary font-medium hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;