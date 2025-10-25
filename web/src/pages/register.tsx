import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input, Label, Spinner } from "~/components";
import { http } from "~/services";
import { UserPlus } from "lucide-react";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    if (!name || !email || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    if (password.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setIsLoading(true);
    try {
      const response = await http.post("/users", { name, email, password });
      const data = response.data;

      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      window.location.href = "/auth/login";
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
            <UserPlus className="text-primary size-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Hisob yaratish</h1>
          <p className="text-muted-foreground">Yangi hisob ochish uchun ma'lumotlaringizni kiriting</p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">To'liq ism</Label>
              <Input
                ref={nameInput}
                type="text"
                id="name"
                placeholder="Ismingiz Familiyangiz"
                disabled={isLoading}
                required
              />
            </div>

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
                minLength={6}
              />
              <p className="text-muted-foreground text-xs">Kamida 6 ta belgi</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Yuklanmoqda...
                </>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </Button>
          </form>
        </div>

        <p className="text-muted-foreground text-center text-sm">
          Hisobingiz bormi?{" "}
          <Link to="/auth/login" className="text-primary font-medium hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </div> 
  );
};

export default Register;