"use client";

import BoardPreview from "@/components/boardPreview";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Icons } from "@/components/ui/icons";
import api from "@/lib/api";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
};
export default function BoardGrid() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [IsLoading, setIsLoading] = useState<Boolean>(true);



  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await api.get("/api/v1/board/find/all");
        setBoards(response.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Erro ao carregar boards", error);
      }
    };
    loadBoards();
  }, []);

  function renderBoards() {
    if (boards.length === 0) {
      return (
        <button className="border border-neutral-200 rounded-md p-4 h-40 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-center">
            <PlusIcon className="w-8 h-8 text-slate-400" />
            <p className="text-sm font-medium text-slate-600">
              Nenhum quadro encontrado
            </p>
            <p className="text-xs text-slate-500">Crie seu primeiro quadro</p>
          </div>
        </button>
      );
    }

    return boards.map((board) => <BoardPreview  key={board.id} board={board} />);
  }

  return (
    <div className={`${!IsLoading ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-full overflow-y-scroll md:auto-rows-max gap-4 w-full mb-6 pb-6" : "flex flex-row justify-center items-center h-full w-full"}`}>
      {IsLoading ? (
        <Icons.spinner className="h-8 w-8 text-yellow-600 animate-spin drop-shadow-sm" />
      ) : (
        renderBoards()
      )}
    </div>
  );
}
