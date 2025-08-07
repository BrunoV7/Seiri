import NavBar from "@/components/nav";

export default function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh relative z-0">
      <NavBar />
      <main className="flex-1 p-4 h-full">
        {children}
      </main>
    </div>
  );
}
