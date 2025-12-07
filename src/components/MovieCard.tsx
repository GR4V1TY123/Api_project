import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Film, Tv, Clapperboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }: any) {
    const navigate = useNavigate();
    const { Title, Year, Poster, Type, imdbID } = movie;

    const icon =
        Type === "series" ? (
            <Tv className="w-4 h-4" />
        ) : Type === "movie" ? (
            <Film className="w-4 h-4" />
        ) : (
            <Clapperboard className="w-4 h-4" />
        );

    const image =
        Poster !== "N/A"
            ? Poster
            : "placeholder.png";

    return (
        <Card className="rounded-xl shadow-sm hover:shadow-md hover:bg-slate-200 transition overflow-hidden p-3">
            <div className="flex w-full justify-center">
                <img
                    src={image}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/placeholder.png";
                    }}
                    alt={Title}
                    className="w-50 h-75 object-cover rounded-xl"
                />
            </div>

            <CardContent className="p-3 flex flex-col gap-2">

                <h2 className="font-medium text-xl line-clamp-2 h-15">{Title}</h2>

                <div className="text-sm text-gray-600">{Year}</div>

                <div className="flex items-center gap-1 text-sm text-gray-700">
                    {icon}
                    <span className="capitalize">{Type}</span>
                </div>

                <Button
                    className="w-full mt-2"
                    onClick={() => navigate(`/movie/${imdbID}`)}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
}
