import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Loader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Badge,
  Input
} from "~/components";
import type { Genre, Movie } from "~/types";
import _ from "lodash";
import { paginate } from "~/utils/pagination-logics";
import { Search, Heart, Plus, Film } from "lucide-react";

interface MoviesState {
  movies: Movie[];
  genres: Genre[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  search: string;
  genreId: string;
  likedMovies: Set<string>;
}

export class Movies extends Component<{}, MoviesState> {
  state: MoviesState = {
    movies: [],
    genres: [],
    isLoading: true,
    page: 1,
    pageSize: 10,
    search: "",
    genreId: "ALL",
    likedMovies: new Set()
  };

  handleGenreId = (id: string) => {
    this.setState({ genreId: id, page: 1 });
  };

  handlePage = (id: number) => {
    this.setState({ page: id });
  };

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value, page: 1 });
  };

  handleLike = (movieId: string) => {
    this.setState(prevState => {
      const likedMovies = new Set(prevState.likedMovies);
      if (likedMovies.has(movieId)) {
        likedMovies.delete(movieId);
      } else {
        likedMovies.add(movieId);
      }
      return { likedMovies };
    });
  };

  async componentDidMount() {
    try {
      const [moviesRes, genresRes] = await Promise.all([
        axios.get<Movie[]>("http://localhost:4000/api/movies"),
        axios.get<Genre[]>("http://localhost:4000/api/genres")
      ]);
      this.setState({
        movies: moviesRes.data,
        genres: genresRes.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) return <Loader full />;

    const { genres, movies, genreId, pageSize, page, search, likedMovies } = this.state;

    let filteredMovies = genreId === "ALL" ? movies : movies.filter(movie => movie.genre._id === genreId);

    if (search) {
      filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
    }

    const totalPages = Math.ceil(filteredMovies.length / pageSize);
    const paginatedMovies = paginate(filteredMovies, page, pageSize);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Kinolar</h1>
              <p className="text-muted-foreground">Jami {filteredMovies.length} ta kino topildi</p>
            </div>
            <Link to="/movies/new">
              <Button>
                <Plus className="mr-2" />
                Yangi kino
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Kinolarni qidiring..." value={search} onChange={this.handleSearch} className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar - Genres */}
          <div className="lg:col-span-1">
            <div className="bg-card sticky top-4 rounded-lg border p-4 shadow-sm">
              <h2 className="mb-4 font-semibold">Janrlar</h2>
              <div className="space-y-2">
                <Button
                  variant={genreId === "ALL" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => this.handleGenreId("ALL")}
                >
                  <Film className="mr-2 size-4" />
                  Barchasi
                </Button>
                {genres.map(genre => (
                  <Button
                    key={genre._id}
                    variant={genreId === genre._id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => this.handleGenreId(genre._id)}
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Movies Table */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Nomi</TableHead>
                    <TableHead>Janr</TableHead>
                    <TableHead className="text-center">Stok</TableHead>
                    <TableHead className="text-center">Narx</TableHead>
                    <TableHead className="text-center"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedMovies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Film className="text-muted-foreground size-8" />
                          <p className="text-muted-foreground">Kinolar topilmadi</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedMovies.map(movie => (
                      <TableRow key={movie._id} className="group">
                        <TableCell className="font-medium">
                          <Link to={`/movies/${movie._id}`} className="hover:text-primary hover:underline">
                            {movie.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{movie.genre.name}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{movie.numberInStock}</TableCell>
                        <TableCell className="text-center">${movie.dailyRentalRate}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => this.handleLike(movie._id)}
                            className="hover:text-red-500"
                          >
                            <Heart
                              className={`size-5 ${likedMovies.has(movie._id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious
                      onClick={() => page > 1 && this.handlePage(page - 1)}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                    {_.range(1, totalPages + 1).map(pageNum => (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => this.handlePage(pageNum)}
                          isActive={pageNum === page}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationNext
                      onClick={() => page < totalPages && this.handlePage(page + 1)}
                      className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Movies;