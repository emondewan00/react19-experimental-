import { Suspense, use } from "react";

const JokeItem = () => {
  const joke = use(fetchJokes());
  return (
    <h2 className="text-xl font-medium italic text-neutral-900">
      {joke.value}
    </h2>
  );
};

export default function Joke() {
  return (
    <div className="shadow p-4 my-6 rounded bg-emerald-50">
      <Suspense
        fallback={
          <h2 className="shadow p-4 bg-gray-50 text-xl text-center font-bold mt-5">
            Loading...
          </h2>
        }
      >
        <JokeItem />
      </Suspense>
    </div>
  );
}

const fetchJokes = async () => {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    return res.json();
  } catch (err) {
    return new Promise((_, reject) => reject(err));
  }
};
