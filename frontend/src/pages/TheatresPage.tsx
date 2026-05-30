import {
  Building2,
  MapPin,
  Star,
  MonitorPlay,
  ParkingCircle,
  Popcorn,
  Sofa,
  Speaker,
  Clapperboard,
} from "lucide-react";
import {
  useDeleteTheatreMutation,
  useGetAllTheatresQuery,
} from "../features/theatreApi";
import toast from "react-hot-toast";
import { useEffect } from "react";



function getFacilityIcon(facility: string) {
  switch (facility) {
    case "IMAX":
      return <MonitorPlay size={13} />;

    case "Parking":
      return <ParkingCircle size={13} />;

    case "Food Court":
      return <Popcorn size={13} />;

    case "Luxury Recliners":
      return <Sofa size={13} />;

    case "Dolby Atmos":
      return <Speaker size={13} />;

    case "4DX":
      return <Clapperboard size={13} />;

    default:
      return <Star size={13} />;
  }
}

export default function TheatresPage() {
  useEffect(() => {});

  const { data, refetch } =
    useGetAllTheatresQuery();

  const [deleteTheatre] =
    useDeleteTheatreMutation();

  const handleDelete = async (
    theatreId: string
  ) => {
    try {
      await deleteTheatre(
        theatreId
      ).unwrap();

      await refetch();

      toast.success(
        "Theatre deleted successfully"
      );
    } catch (error) {
      toast.error(
        "Theatre not deleted"
      );
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
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

            <span className="text-[10px] uppercase tracking-[3px] text-violet-500">
              THEATRES
            </span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Theatre Management
          </h1>
        </div>

        {/* GRID */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {data?.map((theatre) => (
            <div
              key={theatre.id}
              className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition hover:-translate-y-1"
            >
              {/* DECORATION */}
              <div className="absolute right-[-40px] top-[-40px] h-[100px] w-[100px] rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative z-10">
                {/* ICON */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] text-white shadow-md">
                  <Building2 size={20} />
                </div>

                {/* NAME */}
                <h2 className="text-xl font-semibold">
                  {theatre.name}
                </h2>

                {/* CITY */}
                <div className="mt-2 flex items-center gap-2 text-sm text-[#6B6B7E]">
                  <MapPin size={14} />
                  <span>{theatre.city}</span>
                </div>

                {/* FACILITIES */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {theatre.facilities.map(
                    (facility) => (
                      <span
                        key={facility}
                        className="flex items-center gap-1 rounded-full border border-white/60 bg-white/80 px-2.5 py-1.5 text-xs font-medium"
                      >
                        {getFacilityIcon(
                          facility
                        )}
                        {facility}
                      </span>
                    )
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => {
                    handleDelete(
                      theatre.id
                    );
                  }}
                  className="mt-5 w-full rounded-lg bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-95"
                >
                  Delete Theatre
                </button>
              </div>
            </div>
          ))}
        </div>

        {!data?.length && (
          <div className="mt-6 rounded-2xl border border-white/60 bg-white/70 p-10 text-center shadow-sm backdrop-blur-xl">
            <h3 className="text-xl font-semibold">
              No Theatres Found
            </h3>

            <p className="mt-2 text-sm text-[#6B6B7E]">
              Add a theatre to see it listed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}