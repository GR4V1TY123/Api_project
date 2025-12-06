import { Card, CardContent } from "@/components/ui/card";
import MovieCard from "./MovieCard";

export default function List({movies}: any) {

  return (
    <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-6">
      {movies.map((movie: any) => (
        <MovieCard movie={movie}/>
      ))}
    </div>
  );
}
