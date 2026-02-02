import Link from "next/link";
import { auth } from "../_lib/auth";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { signOutAction } from "../_lib/actions";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <div className="flex items-center gap-4">
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-2 relative"
              >
                <Image
                  src={session.user.image}
                  className="rounded-full object-cover"
                  height="32"
                  width="32"
                  alt={session.user.name}
                  referrerPolicy="no-referre"
                />

                <span>Guest area</span>
              </Link>
              <div>
                <form action={signOutAction}>
                  <button
                    className="underline text-accent-500 flex"
                    title="Sign out"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-7 w-7 text-primary-600" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <span>Guest area</span>
              </Link>

              <Link
                href="/api/auth/signin"
                className="underline text-accent-500"
              >
                Login
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
