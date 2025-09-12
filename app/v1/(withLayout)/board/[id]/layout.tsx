// layout.tsx
import api from "@/lib/api";
import { BoardProvider } from "./boardContext";
import BoardNavBar from "@/components/boardNavBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BoardProvider>
      <div className="h-[100%] flex flex-col">
        <BoardNavBar isColab={false} />
        <main className="h-[100%]">{children}</main>
      </div>
    </BoardProvider>
  );
}
