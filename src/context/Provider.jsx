"use client";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children, session }) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      {children}
    </SessionProvider>
  );
}
