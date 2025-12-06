import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner"
import useMovieFetch from "@/hooks/useMovieFetch";
import List from "@/components/List";

export default function Home() {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setpage] = useState(1);
  const [errorText, setErrorText] = useState("Try searching for movies or shows!")
  const [validationErrors, setValidationErrors] = useState({
    titleMsg: "",
    limitMsg: ""
  })

  // use hook to fetch movies and other things
  const { loading, error, fetchMovies, movies } = useMovieFetch();

  // Input validation function
  const isValid = () => {
    if (title.trim() === "")
      setValidationErrors({ ...validationErrors, titleMsg: "Title should not be empty" })
    if (limit < 1 || limit > 10)
      setValidationErrors({ ...validationErrors, limitMsg: "Limit should be between 1 to 10" })
    if (validationErrors.titleMsg === "" && validationErrors.limitMsg === "") {
      return true;
    }
  }

  // Onclick function for seach button
  const handleSearch = async () => {
    if (!isValid) return;
    fetchMovies({ title, page });
    setSearch(title)
    setErrorText(error)
    console.log("Searching for:", title, "Limit:", page);
    console.log(movies)
  };

  return (
    <div className="justify-center items-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-5">

          <h1 className="text-2xl font-semibold text-center">Find Movies / TV Shows</h1>

          <div className="space-y-2">
            <label className="text-m font-medium">Title</label>
            <Input
              placeholder="Enter movie or series name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-m font-medium">Search Limit (max 10)</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={limit}
              onChange={(e) => setLimit(Math.min(10, Number(e.target.value)))}
            />
          </div>

          <Button
            className="w-full rounded-xl text-base py-2"
            onClick={handleSearch}
          >
            Search
          </Button>

        </CardContent>
      </Card>
      <div className="m-5 text-lg">
        Search results for "{search}"
      </div>

      {/* Conditional Render movies */}
      <div>
        {
          // set loading spinner
          // display api error if any or render normally
          (loading ? (<div className="flex items-center">
            <Spinner className="size-10 text-purple-500" />
          </div>) :
            (movies.length === 0 ? <span>{errorText}</span> : (<List movies={movies} />)))
        }
      </div>
    </div>
  );
}
