import { AxiosError } from "axios";
import { Component } from "react";
import { toast } from "react-hot-toast";
import { Loader } from "~/components";
import { http } from "~/services";
import type { Movie } from "~/types";
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
        toast.error(error.response?.data || "An unexpected error occurred");
      }
    }
  }
  render() {
    if (this.state.isLoading) return <Loader full />;
    return <div>Movie: {JSON.stringify(this.state.movie, null, 2)}</div>;
  }
}
