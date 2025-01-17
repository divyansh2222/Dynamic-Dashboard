"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./login/page";
import Dashboard from "./dashboard/page";

export default function Component() {
  const { data: session } = useSession();
  console.log("session", session);
  if (session) {
    return (
      <>
        <Dashboard session={session} signOut={signOut} />
      </>
    );
  }
  return (
    <>
      <Login signIn={signIn} />
    </>
  );
}
