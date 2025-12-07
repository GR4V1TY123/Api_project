import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner"
import useMovieFetch from "@/hooks/useMovieFetch";
import List from "@/components/List";
import ApiInfo from "@/components/ApiInfo";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState("");
  const [errorText, setErrorText] = useState("Try searching for movies or shows!")
  const [validationErrors, setValidationErrors] = useState({
    titleMsg: "",
  })

  // use hook to fetch movies and other things
  const { loading, error, movies, apiResponse, title, fullJson } = useMovieFetch();

  // Input validation function
  const isValid = () => {
    let titleMsg = "";

    if (inputSearch.trim() === "") {
      titleMsg = "Title should not be empty";
    }
    setValidationErrors({
      titleMsg,
    });
    return titleMsg === "";
  };

  // Onclick function for seach button
  const handleSearch = () => {
    if (!isValid()) return;
    navigate(`/?title=${inputSearch}`);
    if (error) setErrorText(String(error))
    console.log(movies)
  };

  return (
    <div className="justify-center items-center bg-gray-50 p-4">
      <div className="md:flex flex-row justify-evenly">
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
          <form action="" method="GET" onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}>
            <CardContent className="p-6 space-y-5">

              <h1 className="text-2xl font-semibold text-center">Find Movies / TV Shows</h1>

              <div className="space-y-2">
                <label className="text-m font-medium">Title</label>
                <Input
                  placeholder="Enter movie or series name"
                  value={inputSearch}
                  name="title"
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                {
                  (validationErrors.titleMsg && <span className="text-xs text-red-600">*{validationErrors.titleMsg}</span>)
                }
              </div>

              {
                (loading ? <Button className="w-full rounded-xl text-base py-2" disabled><Spinner />Loading</Button> : <Button
                  className="w-full rounded-xl text-base py-2"
                  type="submit"
                >
                  Search
                </Button>)
              }

            </CardContent>
          </form>
        </Card>
        {/* API DETAILS */}
        <div>
          <ApiInfo apiResponse={apiResponse} title={title} fullJson={fullJson} />
        </div>
      </div>
      <div className="m-5 text-lg">
        {
          (title && <span>Search results for "{title}"</span>)

        }
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
