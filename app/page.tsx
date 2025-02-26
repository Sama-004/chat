"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function App() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>loading...</div>;
  }
  return (
    <>
      {session ? (
        redirect("/home")
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </>
  );
}
