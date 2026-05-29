import React from "react";
import {
  Calendar,
  Clock3,
  MapPin,
  Ticket,
} from "lucide-react";
import { useGetTicketsByUserIdQuery } from "../features/ticketApi";

export default function MyBookingsPage() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const { data } = useGetTicketsByUserIdQuery(user.userId);

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
        {/* HEADER */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

            <span className="text-[10px] uppercase tracking-[3px] text-violet-500">
              MY BOOKINGS
            </span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Your Booked Tickets
          </h1>
        </div>

        {/* BOOKINGS */}
        <div className="grid gap-4">
          {data?.map((booking) => (
            <div
              key={booking.id}
              className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:p-5"
            >
              <div className="absolute right-[-50px] top-[-50px] h-[100px] w-[100px] rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative z-10">
                {/* TOP */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {booking.movieName}
                    </h2>
                  </div>

                  <div className="w-fit flex gap-2 rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-4 py-3 text-white shadow-md">
                    <h3 className="mt-1 text-xl font-bold">
                      ₹{booking.seatsBooked * 340}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[2px] text-white/70">
                      Paid
                    </p>

                  </div>
                </div>

                {/* INFO */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <SmallInfo
                    icon={<MapPin size={15} />}
                    text={booking.theatreName}
                  />

                  <SmallInfo
                    icon={<Calendar size={15} />}
                    text={String(booking.showDate).split("T")[0]}
                  />

                  <SmallInfo
                    icon={<Clock3 size={15} />}
                    text={booking.showTime}
                  />

                  <SmallInfo
                    icon={<Ticket size={15} />}
                    text={`${booking.seatsBooked} Tickets`}
                  />

                  <div className="flex items-center justify-center rounded-lg bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600">
                    Confirmed
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!data?.length && (
            <div className="rounded-2xl border border-white/60 bg-white/70 p-10 text-center shadow-sm backdrop-blur-xl">
              <h3 className="text-xl font-semibold">
                No Bookings Found
              </h3>

              <p className="mt-2 text-sm text-[#6B6B7E]">
                Your booked movie tickets will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* SMALL INFO CARD */
type SmallInfoProps = {
  icon: React.ReactNode;
  text: string;
};

function SmallInfo({ icon, text }: SmallInfoProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/80 px-3 py-3 text-sm font-medium shadow-sm">
      <span className="text-[#6D5EF5]">{icon}</span>

      <span className="truncate">{text}</span>
    </div>
  );
}