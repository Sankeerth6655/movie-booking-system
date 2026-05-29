import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useGetAllMoviesQuery } from "../features/moviesApi";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [search, setSearch] = useState("");

  const { data } = useGetAllMoviesQuery();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const navigate = useNavigate();

  const filteredMovies = useMemo(() => {
    return data?.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <div className="relative min-h-screen overflow-hidden text-[#1A1A2E]">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 10% 0%, #fde8d8 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 90% 5%, #f3e8ff 0%, transparent 50%),
              radial-gradient(ellipse 70% 70% at 50% 55%, #ede9fe 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 5% 80%, #dbeafe 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 95% 85%, #f5f3ff 0%, transparent 55%),
              linear-gradient(
                160deg,
                #fff8f4 0%,
                #f5f3ff 40%,
                #f8fafc 70%,
                #eef5ff 100%
              )
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* SEARCH */}
        <div className="px-4 pt-5 sm:px-6 lg:px-8">
          <div className="flex overflow-hidden rounded-xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-xl">
            <div className="flex items-center px-3 text-[#6D5EF5]">
              <Search size={18} />
            </div>

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#6B6B7E]"
            />

            <button className="bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-4 text-sm font-medium text-white sm:px-6">
              Search
            </button>
          </div>

          {/* SEARCH RESULTS */}
          {search && (
            <div className="mt-3 overflow-hidden rounded-xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-xl">
              {filteredMovies && filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-white/40 px-4 py-3 transition hover:bg-white/50 last:border-none"
                  >
                    <div>
                      <h3 className="text-sm font-semibold">
                        {movie.title}
                      </h3>

                      <p className="text-xs text-[#6B6B7E]">
                        {movie.censorCertificate}
                      </p>
                    </div>

                    <span className="rounded-md bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-2.5 py-1 text-xs font-medium text-white">
                      ★ {movie.rating}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-5 text-center text-sm text-[#6B6B7E]">
                  No movies found
                </div>
              )}
            </div>
          )}
        </div>

        {/* HERO */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg sm:p-8 lg:p-10"
            style={{
              backgroundImage:
                "url('https://i.ytimg.com/vi/lDVQojLPI4Y/maxresdefault.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-violet-500/15 blur-3xl" />

            <div className="absolute bottom-[-60px] left-0 h-[180px] w-[180px] rounded-full bg-indigo-500/15 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

                <span className="text-[10px] uppercase tracking-[3px] text-violet-200">
                  NOW SHOWING
                </span>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                RRR
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
                A fictionalized story of real-life revolutionaries Alluri
                Sitarama Raju and Komaram Bheem, celebrating brotherhood and
                their fight against the British Raj and the Nizam of Hyderabad.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-md bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-3 py-1.5 text-xs font-semibold">
                  ★ 9.3 / 10
                </span>

                <span className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80">
                  IMAX
                </span>

                <span className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80">
                  3h 28m
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* MOVIES */}
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {search ? "Search Results" : "Now Showing"}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data ? (
              data.map((movie, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-xl transition hover:-translate-y-1"
                >
                  {/* POSTER */}
                  <div className="relative h-[260px] sm:h-[300px]">
                    <img
                      src={movie.posterURL}
                      alt={movie.title}
                      className="h-full w-full object-contain p-2"
                    />

                    <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-violet-200 backdrop-blur">
                      ★ {movie.rating}
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {movie.title}
                    </h3>

                    <p className="mt-1 text-xs uppercase tracking-wide text-[#6B6B7E]">
                      {movie.censorCertificate}
                    </p>

                    <button
                      onClick={() => {
                        navigate(`/moviedetails/${movie.id}`);
                      }}
                      className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-95"
                    >
                      {user.role === "movie-owner" ||
                      user.role === "theatre-owner"
                        ? "Show Details"
                        : "Book Now"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-xl border border-white/60 bg-white/60 p-8 text-center shadow-sm backdrop-blur-xl">
                <h3 className="text-xl font-semibold">
                  No Movies Found
                </h3>

                <p className="mt-2 text-sm text-[#6B6B7E]">
                  Try searching with another movie name.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}