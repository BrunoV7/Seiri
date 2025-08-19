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
      <BoardNavBar />
      <main>{children}</main>
    </BoardProvider>
  );
}
