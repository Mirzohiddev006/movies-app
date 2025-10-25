import axios from "axios";
import { Component } from "react";
import { Loader, Button, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Pagination, PaginationContent, PaginationItem, PaginationLink, } from "~/components";
import type { Genre, Movie } from "~/types";
import _ from "lodash"
import { paginate } from "~/utils/pagination-logics";

interface MoviesState {
  movies: Movie[];
  genres: Genre[];
  isLoading: boolean;
  page: number; // started from 0
  pageSize: number;
  search: string;
  genreId: string;
}

export class Movies extends Component<{}, MoviesState> {
  state: MoviesState = {
    movies: [],
    genres: [],
    isLoading: true,
    page: 0,
    pageSize: 3,
    search: "",
    genreId: "ALL"
  };

  handleGenreId = (id: string) => {
    this.setState({ genreId: id })
  }

  handlePage = (id: number) => {
    this.setState({ page: id })
  }

  async componentDidMount() {
    const { data: movies } = await axios.get<Movie[]>("http://localhost:4000/api/movies");
    const { data: genres } = await axios.get<Genre[]>("http://localhost:4000/api/genres");
    this.setState({ movies, genres, isLoading: false });
  }

  render() {
    if (this.state.isLoading) return <Loader full />;
    const { genres, movies, genreId, pageSize, page } = this.state
    const filteredMovies = genreId === "ALL"
      ? movies
      : movies.filter((movie) => movie.genre._id === genreId)
    const filterPage = paginate(filteredMovies, page, pageSize)

    const paginateItem = _.range(Math.ceil(filteredMovies.length / pageSize))
    return (
      <div className="flex">
        <div className="pl-5 pt-2">
          <ul>
            <li key={"ALL"}>
              <Button children={"All"} variant={"outline"} className="w-[170px]" onClick={() => this.handleGenreId("ALL")} />
            </li>
            {
              genres.map(item => (
                <li key={item._id}>
                  <Button children={item.name} variant={"outline"} className="w-[170px] mt-2" onClick={() => this.handleGenreId(item._id)} />
                </li>
              ))
            }
          </ul>
        </div>
        <div className="ml-[50px]">
          <Table>
            <TableCaption>A list of your recent movies.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead className="w-[150px]">Genre</TableHead>
                <TableHead className="w-[150px]">Stock</TableHead>
                <TableHead className="w-[150px]">Rate</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterPage.map((movie) => (
                <TableRow key={movie._id}>
                  <TableCell className="font-medium">{movie.title}</TableCell>
                  <TableCell >{movie.genre.name}</TableCell>
                  <TableCell>{movie.numberInStock}</TableCell>
                  <TableCell>{movie.dailyRentalRate}</TableCell>
                  <TableCell>🩶</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-2" >
            <PaginationContent>
              {paginateItem.map(item => (
                <PaginationItem key={item} onClick={() => this.handlePage(item)} className={`outline outline-[#1c1c1c] ${item === page && "bg-black text-white outline-none"} rounded-[5px]`}>
                  <PaginationLink href="#">{item}</PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  }
}
