import {
  Clock3,
  Star,
  Calendar,
  Film,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteMovieMutation,
  useGetMovieByIdQuery,
} from "../features/moviesApi";
import toast from "react-hot-toast";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const { data: movieDetails } =
    useGetMovieByIdQuery(movieId!);

  const navigate = useNavigate();

  const [deleteMovie] =
    useDeleteMovieMutation();

  const userString =
    localStorage.getItem("user");

  const user = userString
    ? JSON.parse(userString)
    : null;

  const handleDelete = async () => {
    try {
      await deleteMovie(movieId!);

      toast.success(
        "Movie deleted Successfully"
      );

      navigate("/movies");
    } catch (error) {
      toast.error("Movie not deleted");
    }
  };

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

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* MAIN CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* POSTER */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur-xl">
            <div className="absolute right-[-40px] top-[-40px] h-[120px] w-[120px] rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative h-[420px] overflow-hidden rounded-xl sm:h-[500px]">
              <img
                src={movieDetails?.posterURL}
                alt={movieDetails?.title}
                className="h-full w-full object-contain"
              />

              <div className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 text-violet-200 backdrop-blur">
                <Star
                  size={14}
                  fill="#A78BFA"
                />

                <span className="text-sm font-medium">
                  {movieDetails?.rating}
                </span>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="absolute right-[-60px] top-[-60px] h-[160px] w-[160px] rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10">
              {/* LABEL */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

                <span className="text-[10px] uppercase tracking-[3px] text-violet-500">
                  NOW SHOWING
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {movieDetails?.title}
              </h1>

              {/* LANGUAGES */}
              <div className="mt-4 flex flex-wrap gap-2">
                {movieDetails?.language.map(
                  (genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-white/60 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#6B6B7E]"
                    >
                      {genre}
                    </span>
                  )
                )}
              </div>

              {/* INFO CARDS */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                  icon={
                    <Clock3
                      size={18}
                      className="text-[#6D5EF5]"
                    />
                  }
                  label="Duration"
                  value="2h 28m"
                />

                <InfoCard
                  icon={
                    <Calendar
                      size={18}
                      className="text-[#6D5EF5]"
                    />
                  }
                  label="Release"
                  value="12 July 2026"
                />

                <InfoCard
                  icon={
                    <Film
                      size={18}
                      className="text-[#6D5EF5]"
                    />
                  }
                  label="Format"
                  value="IMAX 4DX"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-semibold">
                  About Movie
                </h2>

                <p className="leading-7 text-[#6B6B7E]">
                  {
                    movieDetails?.description
                  }
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-wrap gap-3">
                {!(
                  user.role ===
                    "movie-owner" ||
                  user.role ===
                    "theatre-owner"
                ) && (
                  <button
                    onClick={() =>
                      navigate(
                        `/booktickets/${movieId}`
                      )
                    }
                    className="rounded-lg bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-95"
                  >
                    Book Tickets
                  </button>
                )}

                {user.role ===
                  "movie-owner" && (
                  <button
                    onClick={handleDelete}
                    className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-95"
                  >
                    Delete Movie
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INFO CARD */
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/80 p-3 shadow-sm">
      {icon}

      <div>
        <p className="text-xs text-[#6B6B7E]">
          {label}
        </p>

        <h3 className="text-sm font-semibold">
          {value}
        </h3>
      </div>
    </div>
  );
}