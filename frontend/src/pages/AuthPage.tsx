import { useState } from "react";
import {
  Lock,
  User,
  ArrowRight,
  Users,
} from "lucide-react";
import { useLoginMutation, useRegisterMutation } from "../features/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Role = "user" | "movie-owner" | "theatre-owner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");

  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLogin) {
      try {
        await login({ username, password }).unwrap();
        toast.success("Login successful");
        navigate("/movies");
      } catch (error) {
        toast.error("Invalid username or password");
      }
    } else {
      try {
        await register({
          username,
          password,
          role,
        }).unwrap();

        toast.success("User registered successfully");
      } catch (error) {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6 text-[#1A1A2E] sm:px-6">

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

      {/* CARD */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-5 shadow-[0_12px_35px_rgba(109,94,245,0.12)] backdrop-blur-xl sm:p-6">

        {/* DECORATION */}
        <div className="absolute right-[-70px] top-[-70px] h-[150px] w-[150px] rounded-full bg-violet-500/15 blur-3xl" />

        <div className="absolute bottom-[-60px] left-[-50px] h-[130px] w-[130px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative z-10">

          {/* LOGO */}
          <div className="mb-6 text-center">

            <h1 className="bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] bg-clip-text text-2xl font-bold tracking-wide text-transparent sm:text-3xl">
              BookMyMoviè
            </h1>

            <p className="mt-2 text-xs text-[#6B6B7E] sm:text-sm">
              Experience Premium Movie Booking
            </p>
          </div>

          {/* TOGGLE */}
          <div className="mb-6 flex rounded-xl border border-white/60 bg-white/40 p-1">

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
                isLogin
                  ? "bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] text-white shadow-md"
                  : "text-[#6B6B7E]"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
                !isLogin
                  ? "bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] text-white shadow-md"
                  : "text-[#6B6B7E]"
              }`}
            >
              Register
            </button>
          </div>

          {/* FORM */}
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >

            {/* USERNAME */}
            <div className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-3 py-3">

              <User
                size={18}
                className="text-[#6D5EF5]"
              />

              <input
                type="text"
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Username"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#6B6B7E]"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-3 py-3">

              <Lock
                size={18}
                className="text-[#6D5EF5]"
              />

              <input
                type="password"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#6B6B7E]"
              />
            </div>

            {/* ROLE */}
            {!isLogin && (
              <div className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-3 py-3">

                <Users
                  size={18}
                  className="text-[#6D5EF5]"
                />

                <select
                  className="w-full bg-transparent text-sm text-[#1A1A2E] outline-none"
                  onChange={(e) =>
                    setRole(
                      e.target.value as Role
                    )
                  }
                  defaultValue=""
                >
                  <option
                    value=""
                    disabled
                  >
                    Select Role
                  </option>

                  <option value="user">
                    User
                  </option>

                  <option value="movie-owner">
                    Movie Owner
                  </option>

                  <option value="theatre-owner">
                    Theatre Owner
                  </option>
                </select>
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(109,94,245,0.25)] transition hover:opacity-95"
            >
              {isLogin
                ? "Login"
                : "Create Account"}

              <ArrowRight size={16} />
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-xs text-[#6B6B7E] sm:text-sm">

            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}

                <button
                  onClick={() =>
                    setIsLogin(false)
                  }
                  className="font-semibold text-[#6D5EF5]"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}

                <button
                  onClick={() =>
                    setIsLogin(true)
                  }
                  className="font-semibold text-[#6D5EF5]"
                >
                  Login
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}