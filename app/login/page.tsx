"use client";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default async function Component() {
  const session = await getServerSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
