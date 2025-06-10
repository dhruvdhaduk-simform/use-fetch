export interface Movie {
    '#TITLE': string;
    '#YEAR': number;
    '#IMDB_ID': string;
    '#RANK': number;
    '#ACTORS': string;
    '#AKA': string;
    '#IMDB_URL': string;
    '#IMDB_IV': string;
    '#IMG_POSTER': string;
}

interface MovieGridProps {
    movies: Array<Movie>;
}

// eslint-disable-next-line
export async function fetchMovies(
    q: string,
    signal?: AbortSignal
): Promise<Array<Movie>> {
    const response = await fetch(
        `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(q)}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error('Unexpected error occured while fetching movies.');
    }

    const json = await response.json();

    return json.description;
}

export function MovieGrid({ movies }: MovieGridProps) {
    if (!movies.length) {
        return (
            <div>
                <p className="text-center">No movies found.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {movies.map((movie) => (
                <div
                    key={movie['#IMDB_ID']}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                    <img
                        src={movie['#IMG_POSTER']}
                        alt={movie['#TITLE']}
                        className="w-full object-cover"
                    />
                    <div className="p-4 text-white space-y-2">
                        <h2 className="text-xl font-bold">{movie['#TITLE']}</h2>
                        <p className="text-sm text-gray-400">
                            AKA: {movie['#AKA']}
                        </p>
                        <p className="text-sm">🎬 Year: {movie['#YEAR']}</p>
                        <p className="text-sm">🏆 Rank: #{movie['#RANK']}</p>
                        <p className="text-sm">
                            🎭 <span className="text-gray-300">Actors:</span>{' '}
                            {movie['#ACTORS']}
                        </p>
                        <a
                            href={movie['#IMDB_URL']}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline inline-block"
                        >
                            View on IMDb
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
