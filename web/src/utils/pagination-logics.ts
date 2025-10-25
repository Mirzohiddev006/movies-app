import _ from "lodash";
import type { Movie } from "~/types";

export const paginate = (movies: Movie[], currentPage: number, pageSize: number) => {
    const startIdx = (currentPage - 1) * pageSize;
   return _(movies).slice(startIdx).take(pageSize).value();
}