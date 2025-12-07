import ApiInfo from "@/components/ApiInfo";
import useIdFetch from "@/hooks/useIdFetch";

export default function Details() {
  const { loading, error, movie, apiResponse, title, fullJson } = useIdFetch();

  // Placeholder till api is processing
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {String(error)}
      </div>
    );
  }

  if (!movie) return null;

  // if image is not available
  const imgSrc =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "/placeholder.png";

  return (
    <div className="md:flex md:flex-row bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Poster */}
          <img
            src={imgSrc}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/placeholder.png";
            }}
            alt={title}
            className="w-full md:w-1/3 rounded-lg shadow-md"
          />

          {/* Right Section */}
          <div className="flex flex-col gap-3 w-full md:w-2/3">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>

            <div className="text-gray-600 flex flex-wrap gap-2 text-sm">
              <span>{movie.Year}</span>
              <span>•</span>
              <span>{movie.Runtime}</span>
              <span>•</span>
              <span>{movie.Rated}</span>
              <span>•</span>
              <span>{movie.Genre}</span>
            </div>

            <p className="text-gray-800 leading-relaxed mt-2">
              {movie.Plot}
            </p>

            {/* Ratings */}
            <div className="mt-4 flex flex-wrap gap-3">
              {movie.Ratings?.map((rate, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-200 rounded-lg text-sm font-semibold shadow"
                >
                  ⭐ {rate?.Source}: {rate?.Value}
                </div>
              ))}
            </div>

            <div className="mt-2">
              <span className="inline-block bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-lg shadow">
                ⭐ IMDb: {movie.imdbRating} ({movie.imdbVotes} votes)
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="border-t mt-6 pt-6 grid md:grid-cols-2 gap-5 text-gray-700">

          <div>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
          </div>

          <div>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
            <p><strong>Production:</strong> {movie.Production}</p>
            <p><strong>Type:</strong> {movie.Type}</p>
            <p><strong>IMDb ID:</strong> {movie.imdbID}</p>
            <p><strong>Website:</strong> {movie.Website}</p>
          </div>

        </div>
      </div>
      {/* RESPONSE INFO */}
      <ApiInfo apiResponse={apiResponse} title={title} fullJson={fullJson} />
    </div>
  );
}
