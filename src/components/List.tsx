import MovieCard from "./MovieCard";
import Category from "./Category";
import { useState } from "react";

export default function List({ movies }: any) {

  const [category, setCategory] = useState("all")

  const filterMovies = movies.filter((m: any) => {
    if(category === "all") return true;
    return m.Type.toLowerCase() === category
  })

  return (
    <div>
      <Category filter={category} setCategory={setCategory} />
      <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-6">
        {filterMovies.map((movie: any, id: Number) => (
          <MovieCard key={id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
