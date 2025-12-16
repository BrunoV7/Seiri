"use client";
import NavBar from "@/components/nav";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";

export default function WithLayout({ children }: { children: React.ReactNode }) {

  const {user} = useUserStore();
  const {fetchUser} = useUserStore();

  useEffect(() => {
    console.log("User in layout:", user);
    if(!user) {
      fetchUser();
    }
    console.log("Fetched user in layout:", user);
  }, [user]);

  return (
    <div className="flex flex-col h-dvh relative z-0">
      <main className="flex-1 h-screen">
        {children}
      </main>
    </div>
  );
}
