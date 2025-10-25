import { AxiosError } from "axios";
import { Component } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader, Button, Badge } from "~/components";
import { http } from "~/services";
import type { Movie } from "~/types";
import { ArrowLeft, Calendar, DollarSign, Package } from "lucide-react";

interface SingleMovieState {
  movie: Movie | null;
  isLoading: boolean;
}

export class SingleMovie extends Component {
  state: SingleMovieState = {
    movie: null,
    isLoading: true
  };

  async componentDidMount() {
    try {
      const movieId = window.location.pathname.split("/").pop();
      const { data: movie } = await http.get<Movie>(`/movies/${movieId}`);
      this.setState({ movie, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Xatolik yuz berdi");
      }
    }
  }

  render() {
    if (this.state.isLoading) return <Loader full />;

    const { movie } = this.state;

    if (!movie) {
      return (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl">🎬</div>
            <h2 className="text-2xl font-bold">Kino topilmadi</h2>
            <Link to="/movies">
              <Button>
                <ArrowLeft className="mr-2" />
                Kinolar ro'yxatiga qaytish
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/movies">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 size-4" />
            Orqaga
          </Button>
        </Link>

        <div className="bg-card rounded-lg border p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{movie.title}</h1>
              <Badge variant="secondary" className="mt-4">
                {movie.genre.name}
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                  <Package className="text-primary size-6" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Stokda</p>
                  <p className="text-2xl font-bold">{movie.numberInStock}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-4">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                  <DollarSign className="text-primary size-6" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Kunlik narx</p>
                  <p className="text-2xl font-bold">${movie.dailyRentalRate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-4">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                  <Calendar className="text-primary size-6" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Holat</p>
                  <p className="text-2xl font-bold">{movie.numberInStock > 0 ? "Mavjud" : "Mavjud emas"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg">Ijaraga olish</Button>
              <Button variant="outline" size="lg">
                Sevimlilarga qo'shish
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SingleMovie;