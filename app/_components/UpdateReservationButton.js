"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function UpdateReservationButton() {
  "use client";
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end items-center gap-6">
      <button
        disabled={pending}
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      >
        {pending ? (
          <div className="flex gap-2">
            <span>
              <SpinnerMini />
            </span>{" "}
            <span>Updating...</span>
          </div>
        ) : (
          "Update reservation"
        )}
      </button>
    </div>
  );
}

export default UpdateReservationButton;
