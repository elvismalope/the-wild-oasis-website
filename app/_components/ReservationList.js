"use client";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import Link from "next/link";

function ReservationList({ bookings }) {
  const [optBookings, setOptBookings] = useOptimistic(
    bookings,
    (bookings, bookingId) => {
      return bookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId) {
    setOptBookings(bookingId);
    await deleteReservation(bookingId);
  }

  return optBookings.length === 0 ? (
    <p className="text-lg">
      You have no reservations yet. Check out our{" "}
      <Link className="underline text-accent-500" href="/cabins">
        luxury cabins &rarr;
      </Link>
    </p>
  ) : (
    <ul className="space-y-6">
      {optBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
