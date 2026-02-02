"use client";
import { useState } from "react";

export default function Counter({ users = [] }) {
  const [count, setCount] = useState(0);

  console.log(users);

  return (
    <div>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-white p-3 border-slate-500"
      >
        Count: {count}
      </button>
    </div>
  );
}
