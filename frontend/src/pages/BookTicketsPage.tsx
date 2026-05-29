import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  Film,
  Ticket,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../features/moviesApi";
import { useGetAllTheatresQuery } from "../features/theatreApi";
import { useCreateTicketMutation } from "../features/ticketApi";
import toast from "react-hot-toast";

export default function BookTicketsPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { movieId } = useParams();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const allTheatres = useGetAllTheatresQuery().data;
  const movieDetails = useGetMovieByIdQuery(movieId!).data;

  const [movieName, setMovieName] = useState("");
  const [theatreName, setTheatreName] = useState("");
  const [seatsBooked, setSeatsBooked] = useState(0);
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");

  useEffect(() => {
    if (movieDetails) setMovieName(movieDetails.title);
  }, [movieDetails]);

  const [createTicket] = useCreateTicketMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ticketRequest = {
      userId: user.userId,
      ticketDetails: {
        movieName,
        theatreName,
        showTime,
        seatsBooked,
        showDate,
      },
    };

    try {
      await createTicket(ticketRequest);
      setShowSuccess(true);
    } catch (error) {
      toast.error("Ticket not booked");
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

      {/* MAIN */}
      <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6 lg:p-8">
          {/* DECORATION */}
          <div className="absolute right-[-60px] top-[-60px] h-[150px] w-[150px] rounded-full bg-violet-500/10 blur-3xl" />

          <div className="absolute bottom-[-60px] left-[-50px] h-[130px] w-[130px] rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10">
            {/* HEADER */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

                <span className="text-[10px] uppercase tracking-[3px] text-violet-500">
                  BOOK TICKETS
                </span>
              </div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Reserve Your{" "}
                <span className="text-[#6D5EF5]">
                  Seats
                </span>
              </h1>

              <p className="mt-2 text-sm text-[#6B6B7E]">
                Complete your booking and enjoy your movie experience.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* MOVIE */}
              <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                  <Film
                    size={16}
                    className="text-[#6D5EF5]"
                  />
                  Movie Name
                </label>

                <input
                  type="text"
                  value={movieDetails?.title}
                  placeholder="Movie Name"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              {/* THEATRE */}
              <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                  <Ticket
                    size={16}
                    className="text-[#6D5EF5]"
                  />
                  Theatre
                </label>

                <select
                  className="w-full bg-transparent text-sm outline-none"
                  onChange={(e) =>
                    setTheatreName(e.target.value)
                  }
                >
                  <option value="null">
                    Select Theatre
                  </option>

                  {allTheatres?.map((theatre) => (
                    <option
                      key={theatre.id}
                      value={theatre.name}
                    >
                      {theatre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATE + TIME */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                    <Clock3
                      size={16}
                      className="text-[#6D5EF5]"
                    />
                    Show Timing
                  </label>

                  <select
                    onChange={(e) =>
                      setShowTime(e.target.value)
                    }
                    className="w-full bg-transparent text-sm outline-none"
                  >
                    <option value="null">
                      Select Timing
                    </option>
                    <option value="10:00 AM">
                      10:00 AM
                    </option>
                    <option value="1:00 PM">
                      1:00 PM
                    </option>
                    <option value="4:00 PM">
                      4:00 PM
                    </option>
                    <option value="7:00 PM">
                      7:00 PM
                    </option>
                    <option value="10:00 PM">
                      10:00 PM
                    </option>
                  </select>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                    <Calendar
                      size={16}
                      className="text-[#6D5EF5]"
                    />
                    Date
                  </label>

                  <input
                    type="date"
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setShowDate(e.target.value)
                    }
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* SEATS */}
              <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                  <Ticket
                    size={16}
                    className="text-[#6D5EF5]"
                  />
                  Number of Seats
                </label>

                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Enter seats"
                  onChange={(e) =>
                    setSeatsBooked(
                      Number(e.target.value)
                    )
                  }
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] py-3 text-sm font-medium text-white shadow-md transition hover:opacity-95"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() =>
                setShowSuccess(false)
              }
              className="absolute left-4 top-4 rounded-full border p-2 transition hover:bg-gray-50"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2
                  size={52}
                  className="text-green-500"
                />
              </div>

              <h2 className="text-2xl font-bold">
                Ticket Confirmed
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B6B7E]">
                Your movie tickets have been booked
                successfully. Enjoy your show 🍿
              </p>

              <button
                onClick={() =>
                  navigate("/mybookings")
                }
                className="mt-6 rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}