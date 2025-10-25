import { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Movies, NewMovie, Register, SingleMovie } from "./pages";

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="movies">
          <Route index element={<Movies />} />
          <Route path=":movieId" element={<SingleMovie />} />
          <Route path="new" element={<NewMovie />} />
          <Route path="*" element={<Navigate to="/movies" />} />
        </Route>
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index path="*" element={<Navigate to="/auth/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/movies" />} />
      </Routes>
    );
  }
}
