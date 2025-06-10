import { useState } from 'react';
import { MovieGrid, type Movie } from './components/MovieGrid';
import { useDebounce } from './hooks/useDebounce';
import { useFetch } from './hooks/useFetch';

function App() {
    const [search, setSearch] = useState('');

    const query = search.trim();

    const debounedQuery = useDebounce(query, 300);

    const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(debounedQuery)}`;

    console.log(url);
    const { data, error, loading } = useFetch<{ description: Array<Movie> }>(
        url
    );

    const movies = data?.description;

    return (
        <div className="bg-gray-900 min-h-screen p-6 text-white">
            <h1 className="text-3xl font-bold text-center mb-8">
                🎥 Top Movies
            </h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>{loading && <p className="text-center">Loading . . .</p>}</div>

            <div>
                {debounedQuery && error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}
            </div>

            <MovieGrid movies={movies || []} />
        </div>
    );
}

export default App;
