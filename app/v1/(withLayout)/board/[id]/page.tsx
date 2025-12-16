"use client";

import { useState, useRef } from "react";
import { useBoardContext } from "./boardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import useOnClickOutside from "@/utils/hook";
import Column from "./collumn";

export default function Board() {
  const { board, setBoard } = useBoardContext();

  // Column creation state
  const [isCreateColumnClicked, setIsCreateColumnClicked] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [isLoadingCreateColumn, setIsLoadingCreateColumn] = useState(false);

  // Card creation state (track which column is active)
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [newCardName, setNewCardName] = useState("");
  const [isLoadingCreateCard, setIsLoadingCreateCard] = useState(false);

  // Column creation handler
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef, () => {
    if (!newColumnName.trim()) {
      setIsCreateColumnClicked(false);
    } else {
      addColumn();
    }
  });

  const addColumn = async () => {
    if (!newColumnName.trim()) {
      toast.error("Por favor, digite um nome para a coluna");
      return;
    }
    setIsLoadingCreateColumn(true);

    try {
      const response = await api.post(`/api/collumn/v1/new/${board.id}`, {
        name: newColumnName,
      });

      const newColumn = {
        id: response.data.id,
        name: newColumnName,
        card_quantity: 0,
        cards: [],
        board_id: board.id,
      };

      setBoard({
        ...board,
        collumns: [...(board.collumns || []), newColumn],
        collumn_quantity: (board.collumn_quantity || 0) + 1,
      });

      setNewColumnName("");
      setIsCreateColumnClicked(false);
      toast.success("Coluna adicionada com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Não foi possível criar a coluna.");
    } finally {
      setIsLoadingCreateColumn(false);
    }
  };

  return (
    <div className="h-full flex flex-row overflow-x-auto bg-slate-50 p-4 space-x-4">
      {board.collumns?.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          name={column.name}
          card_quantity={column.card_quantity}
          cards={column.cards}
        />
      ))}

      {/* Column Creation */}
      <div className={cn("flex flex-row items-center border-dotted border-2 border-gray-300 rounded-lg min-w-[300px] h-fit p-4 bg-slate-100", isCreateColumnClicked && "border-solid bg-white")}>
        <div ref={containerRef} className="w-full">
          {isCreateColumnClicked ? (
            <div className="flex flex-col space-y-2 w-full">
              <Input
                type="text"
                placeholder="Nome da coluna"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                disabled={isLoadingCreateColumn}
                required
              />
              <Button
                onClick={addColumn}
                disabled={isLoadingCreateColumn || !newColumnName.trim()}
                className="text-slate-900 text-sm bg-yellow-300 hover:bg-slate-300"
              >
                Adicionar coluna
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsCreateColumnClicked(true)}
              className="text-slate-600 w-full bg-slate-100 hover:bg-slate-200"
              variant="ghost"
            >
              Criar nova coluna
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
