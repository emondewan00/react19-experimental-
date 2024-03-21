import { createContext, use } from "react";

export default function Container() {
  return (
    <HelloProvider>
      <ThemeCard />
    </HelloProvider>
  );
}

function ThemeCard() {
  const value = use(HelloContext);
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded bg-gray-50 p-8 text-neutral-900 border border-gray-100">
        Value from context: {value}
      </div>
      <div>
        <button className="rounded p-3 bg-blue-600 text-white">
          Change Theme
        </button>
      </div>
    </div>
  );
}

const HelloContext = createContext(null);

export function HelloProvider({ children }) {
  return (
    <HelloContext.Provider value="Welcome to React">{children}</HelloContext.Provider>
  );
}
