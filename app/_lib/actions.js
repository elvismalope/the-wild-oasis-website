"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBooking,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await checkPermission();
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  updateGuest(session.user.guestId, { nationalID, nationality, countryFlag });
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await checkPermission();
  const booking = await getBooking(bookingId);
  console.log(booking);

  if (booking.guestId !== session.user.guestId) {
    throw new Error("User does not have permission to delete reservation");
  }
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await checkPermission();
  const reservationId = formData.get("reservationId");
  const booking = await getBooking(reservationId);
  if (booking.guestId !== session.user.guestId) {
    throw new Error("User does not have permission to update reservation");
  }
  await updateBooking(reservationId, {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  });
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

async function checkPermission() {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  return session;
}
