import { useState } from 'react'

export default function useMovieFetch() {

    const apiKey = import.meta.env.VITE_OMDB_KEY;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [movies, setMovies] = useState([])

    const fetchMovies = async ({ title, page }: any) => {
        setError("")
        setLoading(true)
        setMovies([])

        {/* try 3 times, till we get movies */ }
        let count = 3;
        let success = false;
        while (count > 0) {
            try {
                const data = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}&page=${page}`)
                const res = await data.json();
                if (res.Response === "True") {
                    success = true;
                    setMovies(res.Search);
                    break;
                }
            } catch (e: any) {
                setError(e.message);
                break;
            }
            count--;
        }
        if (!success && error === "") {
            setError("Unable to retrieve movies");
        }
        setLoading(false)
    }

    return { loading, error, movies, fetchMovies };

}
