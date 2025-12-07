import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function useMovieFetch() {
    const apiKey = import.meta.env.VITE_OMDB_KEY;

    // Get title from url
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    // States for api log
    const [apiResponse, setApiResponse] = useState({
        resJson: {},
        resTime: 0.00,
        statusCode: 0,
        resType: "",
        resHeaders: {},
    });

    const fetchMovies = async () => {
        if (!title?.trim()) return []

        const currTime = Date.now();
        const data = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}&page=${1}`)
        const res = await data.json();
        const headersObj = Object.fromEntries(data.headers.entries());
        const afterTime = Date.now();
        setApiResponse({
            resJson: res,
            statusCode: data.status,
            resType: data.type,
            resHeaders: headersObj,
            resTime: afterTime - currTime
        });
        if (res.Response === "True") {
            return res;
        }
        throw new Error("Failed to fetch movies")
    }

    // Cache logic
    // title is used as key, when title changes we call the api again
    const query = useQuery(
        {
            queryKey: [title],
            queryFn: fetchMovies,
            retry: 2,
            enabled: !!title,
            staleTime: 1000 * 60 * 5
        }
    )

    return { title, fullJson: query.data, loading: query.isLoading, error: query.error, movies: query.data?.Search || [], fetchMovies, apiResponse };

}
