import { useState } from "react";
import {
  Film,
  Image,
  Languages,
  Star,
} from "lucide-react";
import { useCreateMovieMutation } from "../features/moviesApi";
import toast from "react-hot-toast";

export default function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [posterURL, setPosterURL] =
    useState("");

  const [rating, setRating] =
    useState("");

  const [
    censorCertificate,
    setCensorCertificate,
  ] = useState("U");

  const [languages, setLanguages] =
    useState<string[]>([]);

  const handleLanguageChange = (
    language: string
  ) => {
    setLanguages((prev) =>
      prev.includes(language)
        ? prev.filter(
            (item) => item !== language
          )
        : [...prev, language]
    );
  };

  const [createMovie] =
    useCreateMovieMutation();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createMovie({
        title,
        description,
        language: languages,
        rating: Number(rating),
        censorCertificate,
        posterURL,
      });

      toast.success(
        "Movie added successfully"
      );

      setTitle("");
      setDescription("");
      setLanguages([]);
      setRating("");
      setCensorCertificate("U");
      setPosterURL("");
    } catch (error) {
      toast.error("Movie not added");
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
        <div className="w-full max-w-2xl rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6 lg:p-8">
          {/* HEADER */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6]" />

              <span className="text-[10px] uppercase tracking-[3px] text-violet-500">
                MOVIE OWNER
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Add{" "}
              <span className="text-[#6D5EF5]">
                Movie
              </span>
            </h1>

            <p className="mt-2 text-sm text-[#6B6B7E]">
              Create a new movie listing
              for your audience.
            </p>
          </div>

          {/* FORM */}
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {/* TITLE */}
            <InputBox
              icon={<Film size={16} />}
              label="Movie Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter movie title"
            />

            {/* POSTER URL */}
            <InputBox
              icon={<Image size={16} />}
              label="Poster URL"
              value={posterURL}
              onChange={(e) =>
                setPosterURL(e.target.value)
              }
              placeholder="Paste poster image URL"
            />

            {/* LANGUAGES */}
            <div className="rounded-xl border border-white/60 bg-white/80 p-4">
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                <Languages
                  size={16}
                  className="text-[#6D5EF5]"
                />
                Languages
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "Telugu",
                  "Hindi",
                  "English",
                  "Kannada",
                  "Tamil",
                  "Malayalam",
                ].map((language) => (
                  <label
                    key={language}
                    className="flex items-center gap-2 rounded-lg border border-white/60 bg-white px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={languages.includes(
                        language
                      )}
                      onChange={() =>
                        handleLanguageChange(
                          language
                        )
                      }
                    />

                    <span>{language}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* RATING + CERTIFICATE */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
                  <Star
                    size={16}
                    className="text-[#6D5EF5]"
                  />
                  Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(e) =>
                    setRating(
                      e.target.value
                    )
                  }
                  placeholder="8.5"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="rounded-xl border border-white/60 bg-white/80 p-4">
                <label className="mb-2 block text-sm font-medium text-[#6B6B7E]">
                  Censor Certificate
                </label>

                <select
                  value={
                    censorCertificate
                  }
                  onChange={(e) =>
                    setCensorCertificate(
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent text-sm outline-none"
                >
                  <option value="U">
                    U
                  </option>
                  <option value="U/A">
                    U/A
                  </option>
                  <option value="A">
                    A
                  </option>
                  <option value="S">
                    S
                  </option>
                </select>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-xl border border-white/60 bg-white/80 p-4">
              <label className="mb-2 block text-sm font-medium text-[#6B6B7E]">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Enter movie description..."
                className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[#6B6B7E]"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] py-3 text-sm font-medium text-white shadow-md transition hover:opacity-95"
            >
              Add Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

type InputProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

function InputBox({
  icon,
  label,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/80 p-4">
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B6B7E]">
        <span className="text-[#6D5EF5]">
          {icon}
        </span>

        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-[#6B6B7E]"
      />
    </div>
  );
}