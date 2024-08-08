"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useAppwrite } from "@/context/use-appwrite";

const Nav = () => {
  const { user, logout, loading } = useAppwrite();

  return (
    <nav className="fixed top-1 w-full bg-neutral-800 text-neutral-50 mx-auto max-w-5xl py-2 px-3 rounded-lg flex justify-between items-center z-50">
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        Catan Stats
      </Link>
      <div className="text-sm">
        {user ? (
          <>
            <Link
              href="/account"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Account
            </Link>
            <Button
              onClick={logout}
              disabled={loading}
              variant={"ghost"}
              size={"sm"}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export { Nav };
