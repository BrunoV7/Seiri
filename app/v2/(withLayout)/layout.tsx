import NavBar from "@/components/nav";
import BoardGrid from "./dashboard/BoardGrid";

export default function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh">
      <NavBar />
      <main className="flex-1 p-4 h-full">
        {children}
      </main>
    </div>
  );
}
