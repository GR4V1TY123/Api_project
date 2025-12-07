import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function useIdFetch() {

    const apiKey = import.meta.env.VITE_OMDB_KEY;
    const params = useParams();
    const id = params.id


    // States for api log
    const [apiResponse, setApiResponse] = useState({
        resTime: 0.00,
        statusCode: null,
        resType: "",
        resHeaders: {},
    });

    // States for frontend view

    const fetchMovie = async () => {
        const currTime = Date.now();
        const data = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`)
        const res = await data.json();
        const headersObj = Object.fromEntries(data.headers.entries());
        const afterTime = Date.now();
        setApiResponse((prev: any) => ({
            ...prev,
            statusCode: data.status,
            resType: data.type,
            resHeaders: headersObj,
            resTime: afterTime - currTime
        }));

        if (res.Response === "True") {
            return res;
        }
        throw new Error("Failes to fetch movie details");
    }

    const query = useQuery(
        {
            queryKey: [id],
            queryFn: fetchMovie,
            retry: 2,
            enabled: !!id,
            staleTime: 1000 * 60 * 5
        }
    )
    return { title: id, fullJson: query.data, loading: query.isLoading, error: query.error, movie: query.data, fetchMovie, apiResponse };

}
