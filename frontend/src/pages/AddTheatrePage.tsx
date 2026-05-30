import {
  Building2,
  MapPin,
  CheckSquare,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddTheatreMutation,
  useGetAllTheatresQuery,
} from "../features/theatreApi";

export default function AddTheatrePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [facilities, setFacilities] = useState<string[]>([]);

  const [addTheatre] = useAddTheatreMutation();
  const { refetch } = useGetAllTheatresQuery();

  const handleFacilityChange = (
    facility: string
  ) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter(
            (item) => item !== facility
          )
        : [...prev, facility]
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await addTheatre({
        name,
        city,
        facilities,
      });

      await refetch();

      toast.success(
        "Theatre added successfully"
      );

      setName("");
      setCity("");
      setFacilities([]);
    } catch (error) {
      toast.error("Theatre not added");
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

      {/* MAIN */}
      <div className="flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6 lg:p-8">
          {/* HEADER */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

              <span className="text-[10px] uppercase tracking-[3px] text-violet-500">
                THEATRE OWNER
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Add{" "}
              <span className="text-[#6D5EF5]">
                Theatre
              </span>
            </h1>

            <p className="mt-2 text-sm text-[#6B6B7E]">
              Add a new theatre and its
              available facilities.
            </p>
          </div>

          {/* FORM */}
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {/* THEATRE NAME */}
            <div className="rounded-xl border border-white/60 bg-white/80 p-4">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                <Building2
                  size={16}
                  className="text-[#6D5EF5]"
                />
                Theatre Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter theatre name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#6B6B7E]"
              />
            </div>

            {/* LOCATION */}
            <div className="rounded-xl border border-white/60 bg-white/80 p-4">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                <MapPin
                  size={16}
                  className="text-[#6D5EF5]"
                />
                Location
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                placeholder="Enter theatre location"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#6B6B7E]"
              />
            </div>

            {/* FACILITIES */}
            <div className="rounded-xl border border-white/60 bg-white/80 p-4">
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                <CheckSquare
                  size={16}
                  className="text-[#6D5EF5]"
                />
                Facilities
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "IMAX",
                  "Dolby Atmos",
                  "4DX",
                  "Luxury Recliners",
                  "Food Court",
                  "Parking",
                ].map((facility) => (
                  <label
                    key={facility}
                    className="flex items-center gap-2 rounded-lg border border-white/60 bg-white px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={facilities.includes(
                        facility
                      )}
                      onChange={() =>
                        handleFacilityChange(
                          facility
                        )
                      }
                    />

                    <span>{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] py-3 text-sm font-medium text-white shadow-md transition hover:opacity-95"
            >
              Add Theatre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



