import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input, Label, Spinner, Loader } from "~/components";
import { http } from "~/services";
import { ArrowLeft, Film } from "lucide-react";
import type { Genre } from "~/types";

export const NewMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const navigate = useNavigate();

  const titleInput = useRef<HTMLInputElement>(null);
  const genreInput = useRef<HTMLSelectElement>(null);
  const stockInput = useRef<HTMLInputElement>(null);
  const rateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const { data } = await http.get<Genre[]>("/genres");
      setGenres(data);
    } catch (error) {
      toast.error("Janrlarni yuklashda xatolik");
    } finally {
      setLoadingGenres(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleInput.current?.value;
    const genreId = genreInput.current?.value;
    const numberInStock = stockInput.current?.value;
    const dailyRentalRate = rateInput.current?.value;

    if (!title || !genreId || !numberInStock || !dailyRentalRate) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setIsLoading(true);
    try {
      await http.post("/movies", {
        title,
        genreId,
        numberInStock: parseInt(numberInStock),
        dailyRentalRate: parseFloat(dailyRentalRate)
      });

      toast.success("Kino muvaffaqiyatli qo'shildi!");
      navigate("/movies");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingGenres) {
    return <Loader full />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/movies">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 size-4" />
          Orqaga
        </Button>
      </Link>

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <div className="bg-primary/10 mx-auto flex size-12 items-center justify-center rounded-full">
            <Film className="text-primary size-6" />
          </div>
          <h1 className="text-center text-3xl font-bold tracking-tight">Yangi kino qo'shish</h1>
          <p className="text-muted-foreground text-center">Kino haqida ma'lumotlarni kiriting</p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Kino nomi</Label>
              <Input
                ref={titleInput}
                type="text"
                id="title"
                placeholder="Kino nomini kiriting"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Janr</Label>
              <select
                ref={genreInput}
                id="genre"
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                disabled={isLoading}
                required
              >
                <option value="">Janrni tanlang</option>
                {genres.map(genre => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stock">Stokda</Label>
                <Input
                  ref={stockInput}
                  type="number"
                  id="stock"
                  placeholder="0"
                  min="0"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Kunlik narx ($)</Label>
                <Input
                  ref={rateInput}
                  type="number"
                  id="rate"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Yuklanmoqda...
                  </>
                ) : (
                  "Kinoni qo'shish"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/movies")} disabled={isLoading}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewMovie;